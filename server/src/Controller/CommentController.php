<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\CommentRepository;
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
        private CommentRepository $commentRepository,
        private JWTEncoderInterface $jwtEncoder,
        private SerializerInterface $serializer,
    ) {
    }

    #[Route('/{id}', name: "get_all_post_comments", methods: 'GET')]
    public function getAllPostComments(Post $post): JsonResponse
    {
        $commentsData = $this->commentRepository->findBy(['post' => $post]);
        if (count($commentsData) < 1) {
            return $this->json([
                'message' => "No comments were found for this post",
                "errors" => [
                    "There are no comments present for this post"
                ]
            ], 404);
        }
        $comments = json_decode($this->serializer->serialize(
            $commentsData,
            'json',
            [
                'groups' => [
                    "comment"
                ]
            ]
        ), true);
        return $this->json([
            'message' => "Post comments were successfully fetched",
            "comments" => $comments
        ], 200);
    }

    #[Route('/{id}', name: 'create', methods: 'POST')]
    public function create(Post $post, Request $request): JsonResponse
    {
        $commentData = json_decode($request->getContent(), true);
        $comment = new Comment();
        $form = $this->createForm(CommentType::class, $comment);

        $form->submit($commentData);
        if ($form->isValid()) {
            $user = $this->getUserFromToken($request, $this->jwtEncoder, $this->userRepository);

            $comment->setOwner($user);
            $comment->setPost($post);

            $this->entityManager->persist($comment);
            $this->entityManager->flush();


            $commentsData = $this->commentRepository->findBy(['post' => $post]);
            $comments = json_decode($this->serializer->serialize(
                $commentsData,
                'json',
                [
                    'groups' => [
                        "comment"
                    ]
                ]
            ), true);


            return $this->json([
                "message" => "Comment was successfully added",
                "comments" => $comments,
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
