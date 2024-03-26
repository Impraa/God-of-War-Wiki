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

    #[Route('/{id}', name: 'create', methods: 'POST')]
    public function create(Post $post, Request $request): JsonResponse
    {
        $comment = new Comment();
        $form = $this->createForm(CommentType::class, $comment);

        $form->submit($request->request->all());
        if ($form->isValid()) {
            $user = $this->getUserFromToken($request, $this->jwtEncoder, $this->userRepository);

            $comment->setOwner($user);
            $comment->setPost($post);

            $this->entityManager->persist($comment);
            $this->entityManager->flush();


            $commentData = json_decode($this->serializer->serialize(
                $form->getData(),
                "json",
                [
                    'groups' => [
                        'comment',
                    ]
                ]
            ), true);

            return $this->json([
                "message" => "Comment was successfully added",
                "comemnts" => $commentData,
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

    #[Route("/{id}", name: "delete", methods: "DELETE")]
    public function delete(Comment $comment, Request $request): JsonResponse
    {
        $this->entityManager->remove($comment);
        $this->entityManager->flush();

        $commentData = json_decode($this->serializer->serialize(
            $comment,
            "json",
            [
                'groups' => [
                    'comment',
                ]
            ]
        ), true);

        return $this->json([
            "message" => "Comment was deleted successfully",
            "comments" => $commentData
        ], 200);
    }
}
