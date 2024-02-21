<?php

namespace App\EventListener;

use DateTime;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

final class RefreshTokenListener
{
    public function __construct(
        private JWTEncoderInterface $jwtManager,
        private JWTTokenManagerInterface $jwtCreator,
        private UserRepository $userRepository
    ) {
    }
    #[AsEventListener(event: KernelEvents::RESPONSE)]
    public function onKernelResponse(ResponseEvent $event): void
    {
        // ...
        $request = $event->getRequest();

        if (
            $request->attributes->get('_route') === 'api_create_post'
            || $request->attributes->get('_route') === 'api_verify_email'
            || $request->attributes->get("_route") === 'api_post_favourite_post'
            || $request->attributes->get("_route") === 'api_comment_create'
        ) {
            if ($request->cookies->get('JWT_TOKEN')) {
                $jwtToken = $request->cookies->get('JWT_TOKEN');

                $decodedToken = $this->jwtManager->decode($jwtToken);

                $expiration = new DateTime();
                $expiration->setTimestamp($decodedToken['exp']);

                $currentTime = new DateTime();

                $remainingTime = $expiration->getTimestamp() - $currentTime->getTimestamp();

                if ($remainingTime <= 300) {
                    $this->refreshUserToken($decodedToken["id"], $event);

                }
            }
        }
    }

    public function refreshUserToken(int $id, $event): void
    {
        $foundUser = $this->userRepository->findOneBy(["id" => $id]);

        $newJwtToken = $this->jwtCreator->create(($foundUser));

        $response = $event->getResponse();

        $response->headers->clearCookie('JWT_TOKEN');

        $cookie = new Cookie('JWT_TOKEN', $newJwtToken, strtotime("+1 hour"));
        $response->headers->setCookie($cookie);

        $event->setResponse($response);
    }
}
