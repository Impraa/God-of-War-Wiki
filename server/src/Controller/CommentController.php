<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Comment;
use App\Form\CommentType;
use App\utils\HelperFunctions;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

#[Route("/api/comment", name: "api_comment_")]
class CommentController extends AbstractController
{
    use HelperFunctions;

    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository,
        private JWTEncoderInterface $jwtEncoder,
        private SerializerInterface $serializer,
    ) {
    }

    #[Route('/create/{id}', name: 'create')]
    public function create(Post $post, Request $request): JsonResponse
    {
        $comment = new Comment();
        $form = $this->createForm(CommentType::class, $comment);

        $form->submit($request->request->all());
        if ($form->isValid()) {
            $user = $this->getUserFromToken($request, $this->jwtEncoder, $this->userRepository);

            $comment->setCommentor($user);
            $comment->setPost($post);

            $this->entityManager->persist($comment);
            $this->entityManager->flush();


            $commentData = json_decode($this->serializer->serialize(
                $comment,
                "json",
                [
                    'groups' => [
                        'comment',
                        'user',
                        'post'
                    ]
                ]
            ), true);

            return $this->json([
                "message" => "Comment was successfully added",
                "data" => $commentData,
            ], 200);
        }

        $errorMessages = [];

        foreach ($form->getErrors(true) as $error) {
            $errorMessages[] = $error->getMessage();
        }

        return $this->json([
            "message" => "Form data invalid or missing data",
            "errors" => $errorMessages,
        ], 403);
    }
}
