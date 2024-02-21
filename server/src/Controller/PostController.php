<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\PostImages;
use App\Form\CreatePostType;
use App\Form\EditPostType;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use App\utils\HelperFunctions;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

#[Route("/api/post", name: "api_post_")]
class PostController extends AbstractController
{
    use HelperFunctions;

    public function __construct(
        private EntityManagerInterface $entityManager,
        private PostRepository $postRepository,
        private SerializerInterface $serializer,
        private UserRepository $userRepository,
    ) {
    }

    #[Route('/getAll', name: 'all')]
    public function getAllPosts(): JsonResponse
    {
        $posts = $this->postRepository->findAll();

        $postsData = $this->serializer->serialize(
            $posts,
            'json',
            [
                'groups' => [
                    'post',
                    'post_image',
                ]
            ]
        );

        return $this->json([
            'message' => 'Success here are all the posts',
            'posts' => json_decode($postsData, true)
        ], 200);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function createPost(
        Request $request,
        SluggerInterface $sluggerInterface,
        JWTEncoderInterface $jwtManager,

    ): JsonResponse {
        $decodedToken = $jwtManager->decode($request->cookies->get("JWT_TOKEN"));

        if ($decodedToken['username'] !== 'Impra') {
            return $this->json([
                "message" => "You are not allowed to do this"
            ], 403);
        }

        $post = new Post();

        $form = $this->createForm(CreatePostType::class, $post);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            foreach ($request->files->get('postImages') as $postImage) {

                $originalImageName = $postImage->getClientOriginalName();

                $safeImageName = $sluggerInterface->slug($originalImageName);

                $newImageName = $safeImageName . '-' . uniqid() . '.' . $postImage->guessExtension();

                $postImage->move($this->getParameter('post_pictures_directory'), $newImageName);

                $postImageEntity = new PostImages();

                $postImageEntity->setPostImage($newImageName);
                $postImageEntity->setPost($post);

                $this->entityManager->persist($postImageEntity);
                $this->entityManager->flush();

                $post->getPostImages()->add($postImageEntity);
            }

            $this->entityManager->persist($post);
            $this->entityManager->flush();

            $postData = $this->serializer->serialize(
                $post,
                'json',
                [
                    'groups' => [
                        'post',
                        'post_image',
                    ]
                ]
            );
            return $this->json([
                "message" => "Post was successfully created",
                "post" => json_decode($postData, true)
            ], 201);
        }


        $errorMessages = [];

        foreach ($form->getErrors(true) as $error) {
            $errorMessages[] = $error->getMessage();
        }

        return $this->json([
            "message" => "Form data was invalid",
            "error" => $errorMessages,
        ]);
    }

    #[Route("/favourite/{id}", name: "favourite_post", methods: ['POST'])]
    public function favouritePost(Post $post, Request $request, JWTEncoderInterface $jwtManager): JsonResponse
    {
        $user = $this->getUserFromToken($request, $jwtManager, $this->userRepository);
        if ($user->getFavouritePosts()->contains($post))
            return $this->json(["message" => "Post is already favourited"], 400);
        $user->addFavouritePost($post);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json([
            "message" => "Post was added to favourite successfully"
        ], 200);
    }


    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function editPost(Post $post, Request $request, SluggerInterface $slugger)
    {
        $imagesToRemove = $request->get('imagesToRemove');
        $request->request->remove("imagesToRemove");

        $form = $this->createForm(CreatePostType::class, $post);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $requestImages = $request->files->get('postImages');


            if ($imagesToRemove) {
                foreach ($imagesToRemove as $postImage) {
                    if (file_exists($this->getParameter('post_pictures_directory') . '/' . $postImage)) {
                        $existingImagePath = $this->getParameter('post_pictures_directory') . '/' . $postImage;
                        unlink($existingImagePath);

                        $imageToDelete = $this->entityManager->getRepository(PostImages::class)->findOneBy(['postImage' => $postImage]);
                        if ($imageToDelete) {
                            $this->entityManager->remove($imageToDelete);
                            $post->removePostImage($imageToDelete);
                        }
                    }
                }
            }

            // Add new images
            foreach ($requestImages as $postImage) {

                $originalImageName = $postImage->getClientOriginalName();

                $safeImageName = $slugger->slug($originalImageName);

                $newImageName = $safeImageName . '-' . uniqid() . '.' . $postImage->guessExtension();

                $postImage->move($this->getParameter("post_pictures_directory"), $newImageName);

                $newImage = new PostImages();
                $newImage->setPostImage($newImageName);
                $newImage->setPost($post);

                $this->entityManager->persist($newImage);
                $post->addPostImage($newImage);

            }

            $this->entityManager->flush();

            $postData = $this->serializer->serialize(
                $form->getData(),
                'json',
                [
                    'groups' => [
                        'post',
                        'post_image',
                    ]
                ]
            );

            return $this->json([
                "message" => "Post was updated successfully",
                "data" => json_decode($postData, true)
            ], 200);
        }

        $errorMessages = [];

        foreach ($form->getErrors(true) as $error) {
            $errorMessages[] = $error->getMessage();
        }

        return $this->json([
            "message" => "Form data was invalid",
            "error" => $errorMessages,
        ], 400);
    }

    #[Route('/{id}', name: 'single', methods: ['GET'])]
    public function getSingle(
        Post $post,
    ): JsonResponse {

        $postData = $this->serializer->serialize(
            $post,
            'json',
            [
                'groups' => [
                    'post',
                    'post_image',
                ]
            ]
        );
        return $this->json([
            "message" => "Post was found successfully",
            "post" => json_decode($postData, true)
        ], 200);
    }
}
