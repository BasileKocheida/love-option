<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\UserController;

#[ApiResource(
    collectionOperations: [
        'get',
        'post' =>[
            'controller' => [UserController::class, 'createUser'],
            'deserialize' => false,
            'path' => '/users',

        ],
        'me' => [
            'pagination_enabled' => false,
            'path' => '/me',
            'method' => 'get',
            'controller' => [UserController::class, 'me'],
            'read' => false,
            'security' => 'is_granted("ROLE_USER")',
        ],
    ],
    itemOperations: [
        'put',
        'delete',
        'get',
        // recup id user
    ],
    normalizationContext: ['groups' => 'user:read'],
    denormalizationContext: ['groups' => 'user:write']

    )]
    #[ORM\Entity(repositoryClass: UserRepository::class)]
    class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["user:read", "profile:write"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["user:read", "user:write"])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(["user:read"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(["user:read", "user:write"])]
    private ?string $password = null;

    #[Groups(["user:write"])]
    private ?string $plainPassword = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?Profiles $profiles = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getProfiles(): ?Profiles
    {
        return $this->profiles;
    }

    public function setProfiles(Profiles $profiles): self
    {
        // set the owning side of the relation if necessary
        if ($profiles->getUser() !== $this) {
            $profiles->setUser($this);
        }

        $this->profiles = $profiles;

        return $this;
    }
}
