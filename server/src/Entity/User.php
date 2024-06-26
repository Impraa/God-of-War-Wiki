<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[Groups('user')]
class User implements PasswordAuthenticatedUserInterface, UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["comment"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Email(
        message: 'The email {{ value }} is not a valid email.',
    )]
    #[Groups(["comment"])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(["comment"])]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 1024, nullable: true)]
    #[Groups(["comment"])]
    private ?string $bio = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["comment"])]
    private ?string $profilePicture = null;

    #[ORM\ManyToMany(targetEntity: Post::class)]
    #[Groups(['user'])]
    private Collection $favouritePosts;

    #[ORM\Column]
    #[Groups(["comment"])]
    private ?bool $isVerified = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Comment::class, orphanRemoval: true)]
    #[Groups(['user'])]
    private Collection $comments;

    public function __construct()
    {
        $this->favouritePosts = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(?string $profilePicture): static
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getFavouritePosts(): Collection
    {
        return $this->favouritePosts;
    }

    public function addFavouritePost(Post $favouritePost): static
    {
        if (!$this->favouritePosts->contains($favouritePost)) {
            $this->favouritePosts->add($favouritePost);
        }

        return $this;
    }

    public function removeFavouritePost(Post $favouritePost): static
    {
        $this->favouritePosts->removeElement($favouritePost);

        return $this;
    }

    public function isIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = [];
        // guarantee every user at least has ROLE_USER]
        if ($this->isIsVerified()) {
            $roles[] = 'ROLE_VERIFIED';
        }
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }


    public function eraseCredentials(): void
    {
        // Implement this if you store plaintext passwords; otherwise, it can be blank
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->id;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setOwner($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getOwner() === $this) {
                $comment->setOwner(null);
            }
        }

        return $this;
    }
}
