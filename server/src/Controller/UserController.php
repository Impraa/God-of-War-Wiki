<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\LoginType;
use App\Form\RegisterType;
use App\Form\UpdateProfileType;
use App\Security\EmailVerifier;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Mime\Address;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

#[Route(path: "/api", name: "api_")]
class UserController extends AbstractController
{

    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager,
        private EmailVerifier $emailVerifier,
        private SerializerInterface $serializer,
    ) {
    }

    #[Route('/register', name: 'create_user', methods: ["POST"])]
    public function register(Request $request, SluggerInterface $slugger): JsonResponse|RedirectResponse
    {
        $userData = json_decode($request->getContent(), true);

        $isGoogle = false;

        if (isset($userData['id']) && $userData['id'] !== null) {
            $isGoogle = true;

            $userData['password'] = $userData['id'];
            $userData['username'] = $userData['name'];
            unset($userData['id'],$userData['name']);
        }

        unset($userData['confirmPassword']);

        $user = new User();

        $form = $this->createForm(RegisterType::class, $user);

        $form->submit($userData);

        if ($form->isValid()) {

            $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));

            $user->setIsVerified($isGoogle);
           $this->entityManager->persist($user);
           $this->entityManager->flush();

             $this->emailVerifier->sendEmailConfirmation(
                'api_verify_email',
                $user,
                (new TemplatedEmail())
                    ->from(new Address('godofwar@kratos.com', 'God of war Wiki'))
                    ->to($user->getEmail())
                    ->subject('Please Confirm your Email')
                    ->htmlTemplate('confirmation_email.html.twig')
            );
            
      
            $jwtToken = $this->jwtManager->create($user);

            $cookie = new Cookie(
                "JWT_TOKEN",
                $jwtToken,
                strtotime("+1 hour"),
                "/",
                null,
                true,
                true,
                true,
                "none"
            ); 

            $response = $this->json([
                'message' => "User has been registred successfully",
                "user" => $user
            ], 201);

            $response->headers->setCookie($cookie); 

            return $response;
        }

        $errorMessages = [];

        foreach ($form->getErrors(true) as $error) {
            $errorMessages[] = $error->getMessage();
        }

        return $this->json([
            "message" => "Error while proccesing data",
            "errors" => $errorMessages,
        ], 400);
    }

    #[Route('/login', name: "login_user", methods: ["POST"])]
    public function login(Request $request): JsonResponse
    {
        $userData = json_decode($request->getContent(), true);

        $rememberMe = (bool) $userData['rememberMe'];

        unset($userData['rememberMe']);

        $user = new User();

        $form = $this->createForm(LoginType::class, $user);

        $form->submit($userData);

        if (!$form->isValid()) {

            $errorMessages = [];

            foreach ($form->getErrors(true) as $error) {
                $errorMessages[] = $error->getMessage();
            }

            return $this->json([
                "message" => "Error not all data was provided",
                "errors" => $errorMessages
            ], 400);
        }

        $foundUser = $this->userRepository->findOneBy(["username" => $user->getUsername()]);

        if (!$foundUser || !$this->passwordHasher->isPasswordValid($foundUser, $user->getPassword())) {
            return $this->json([
                "message" => "Invalid username or password"
            ], 401);
        }

        $jwtToken = $this->jwtManager->create($foundUser);

        $cookie = new Cookie(
            "JWT_TOKEN",
            $jwtToken,
            $rememberMe ? strtotime("+30 days") : strtotime("+1 hour"),
            "/",
            null,
            true,
            true,
            true,
            "none"
        );

        $userData = json_decode($this->serializer->serialize(
            $foundUser,
            "json",
            [
                'groups' => [
                    'user',
                ]
            ]
        ), true);

        $response = $this->json(["user" => $userData], 200);

        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route("/edit/{id}", name: "edit_profile", methods: ["POST"])]
    public function editProfile(
        User $user,
        Request $request,
        SluggerInterface $slugger,
        Filesystem $filesystem,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $form = $this->createForm(UpdateProfileType::class, $user);

        $userImage = $user->getProfilePicture();

        $form->submit($request->request->all());
        if ($form->isValid()) {

            if ($request->files->has("profilePicture")) {
                $profileImage = $request->files->get('profilePicture');

                $originalImageName = $profileImage->getClientOriginalName();

                $safeImageName = $slugger->slug($originalImageName);

                $newImageName = $safeImageName . '-' . uniqid() . '.' . $profileImage->guessExtension();

                $profileImage->move($this->getParameter("profile_pictures_directory"), $newImageName);

                if ($userImage) {
                    $existingImagePath = $this->getParameter("profile_pictures_directory") . '/' . $userImage;
                    unlink($existingImagePath);
                }
                $user->setProfilePicture($newImageName);
            }

            $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));

            $entityManager->flush();

            return $this->json([
                "Message" => "success user was updated",
            ], 200);
        }



        $errorMessages = [];

        foreach ($form->getErrors(true) as $error) {
            $errorMessages[] = $error->getMessage();
        }

        return $this->json([
            "Message" => "error occured",
            "Error" => $errorMessages
        ], 400);
    }

    #[Route("/resend-email/{id}", name: 'resend email', methods: ['GET'])]
    public function resendConfirmationMail(User $user, Request $request): JsonResponse
    {
        $this->emailVerifier->sendEmailConfirmation(
            'api_verify_email',
            $user,
            (new TemplatedEmail())
                ->from(new Address('godofwar@kratos.com', 'God of war Wiki'))
                ->to($user->getEmail())
                ->subject('Please Confirm your Email')
                ->htmlTemplate('confirmation_email.html.twig')
        );

        return $this->json(["Message" => "Mail was resend successfully"], 200);
    }

    #[Route('/verify/email', name: 'verify_email', methods: ['POST'])]
    public function verifyUserEmail(
        Request $request,
        JWTEncoderInterface $jwtManager,
        UserRepository $userRepository,
    ): JsonResponse {
        $decodedToken = $jwtManager->decode($request->cookies->get("JWT_TOKEN"));

        $foundUser = $userRepository->findOneBy(["username" => $decodedToken['username']]);

        if (!$foundUser) {
            return $this->json([
                'message' => "User is non existant",
            ], 404);
        }


        try {
            $this->emailVerifier->handleEmailConfirmation($request, $foundUser);
        } catch (VerifyEmailExceptionInterface $exception) {

            return $this->json([
                "Message" => "User vefrification failed",
                "error" => $exception->getReason(),
                "url" => $request->getUri()
            ], 400);
        }

        return $this->json(["Message" => "User verified successfully"], 200);
    }

    #[Route("/{id}", name: 'get_single_user', methods: ['GET'])]
    public function getSingle(User $user): JsonResponse
    {

        return $this->json([
            "message" => "Post was found successfully",
            "user" => $user
        ], 200);
    }
}
