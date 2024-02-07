<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\PostImages;
use App\Form\CreatePostType;
use App\Repository\PostRepository;
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

    public function __construct(
        private EntityManagerInterface $entityManager,
        private PostRepository $postRepository,
        private SerializerInterface $serializer,
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

    #[Route('/edit/{id}', name: 'edit', methods: ['POST'])]
    public function editPost(Post $post, Request $request, SluggerInterface $slugger)
    {
        $form = $this->createForm(CreatePostType::class, $post);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            $existingImages = $post->getPostImages();
            $requestImages = $request->files->get('postImages');

            $filenames = [];
            foreach ($requestImages as $postImage) {
                $filenames[] = $postImage->getClientOriginalName();
            }

            $existingImagesNames = [];

            foreach ($existingImages as $existingImage) {
                $existingImagesNames[] = $existingImage->getPostImage();
                $existingImageName = $existingImage->getPostImage();

                if (!in_array($existingImageName, $filenames)) {
                    // Remove image not present in the request

                    $existingImagePath = $this->getParameter("post_pictures_directory") . '/' . $existingImage->getPostImage();
                    unlink($existingImagePath);

                    $post->removePostImage($existingImage);
                    $this->entityManager->remove($existingImage);
                }
            }

            // Add new images
            foreach ($requestImages as $postImage) {
                $imageName = $postImage->getClientOriginalName();

                if (!in_array($imageName, $existingImagesNames)) {
                    // Image is not in the collection, add it

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
            ]);
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
