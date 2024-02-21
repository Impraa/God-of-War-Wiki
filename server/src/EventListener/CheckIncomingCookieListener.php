<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class CheckIncomingCookieListener
{
    public function __construct(
        private JWTEncoderInterface $jwtEncoder
    ) {
    }

    #[AsEventListener(event: KernelEvents::REQUEST)]
    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if (
            $request->attributes->get("_route") === 'api_post_create'
            || $request->attributes->get('_route') === 'api_verify_email'
            || $request->attributes->get("_route") === 'api_post_favourite_post'
        ) {
            $jwtToken = $request->cookies->get("JWT_TOKEN");

            try {
                $this->jwtEncoder->decode($jwtToken);
            } catch (\Exception $e) {
                $event->setResponse(new JsonResponse(["message" => "Your token is invalid"], Response::HTTP_BAD_REQUEST));
            }
        }
    }
}
