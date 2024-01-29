<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\LoginType;
use App\Form\RegisterType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

#[Route(path: "/api", name: "api_")]
class UserController extends AbstractController
{

    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager,
    ) {
    }

    #[Route('/register', name: 'create_user', methods: ["POST"])]
    public function register(
        Request $request,
        SluggerInterface $slugger,

    ): JsonResponse {
        $user = new User();

        $form = $this->createForm(RegisterType::class, $user);

        $form->submit($request->request->all());

        if ($form->isValid()) {

            if ($request->files->has('profilePicture')) {

                $profileImage = $request->files->get('profilePicture');

                $originalImageName = $profileImage->getClientOriginalName();

                $safeImageName = $slugger->slug($originalImageName);

                $newImageName = $safeImageName . '-' . uniqid() . '.' . $profileImage->guessExtension();

                $profileImage->move($this->getParameter("profile_pictures_directory"), $newImageName);

                $user->setProfilePicture($newImageName);

            }

            $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));

            $user->setIsVerified(false);

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            $jwtToken = $this->jwtManager->create($user);

            $cookie = new Cookie("JWT_TOKEN", $jwtToken, strtotime("+1 hour"));

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
    public function login(
        Request $request,
    ): JsonResponse {

        $user = new User();

        $form = $this->createForm(LoginType::class, $user);

        $form->submit($request->request->all());

        if (!$form->isValid()) {
            return $this->json([
                "message" => "Error not all data was provided",
                "errors" => $form->getErrors(true)
            ], 400);
        }

        $foundUser = $this->userRepository->findOneBy(["username" => $user->getUsername()]);

        if (!$foundUser || !$this->passwordHasher->isPasswordValid($foundUser, $user->getPassword())) {
            return $this->json([
                "message" => "Invalid username or password"
            ], 401);
        }

        $jwtToken = $this->jwtManager->create($foundUser);

        $cookie = new Cookie("JWT_TOKEN", $jwtToken, strtotime("+1 hour"));

        $response = $this->json(["user" => $foundUser], 200);

        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route("/edit", name: "edit_profile", methods: ["PATCH"])]
    public function editProfile(
        Request $request,
    ): JsonResponse {
        echo (json_encode($request->getContent(), true));

        return $this->json([
            "Message" => "user was not found"
        ], 404);
    }
}
