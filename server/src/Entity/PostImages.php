<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PostImagesRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PostImagesRepository::class)]
#[Groups(["post_images"])]
class PostImages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["post_image"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["post_image"])]
    private ?string $postImage = null;

    #[ORM\ManyToOne(inversedBy: 'postImages', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['post_details'])]
    private ?Post $post = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPostImage(): ?string
    {
        return $this->postImage;
    }

    public function setPostImage(string $postImage): static
    {
        $this->postImage = $postImage;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): static
    {
        $this->post = $post;

        return $this;
    }
}
