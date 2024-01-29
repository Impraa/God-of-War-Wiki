<?php

namespace App\Entity;

use App\Repository\PostImagesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostImagesRepository::class)]
class PostImages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $postImage = null;

    #[ORM\ManyToOne(inversedBy: 'postImages')]
    #[ORM\JoinColumn(nullable: false)]
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
