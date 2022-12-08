<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Metadata\Resource\Factory\ResourceMetadataCollectionFactoryInterface;
use ApiPlatform\Metadata\ApiResource as MetadataApiResource;
use App\Repository\ProfilesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProfilesRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get'=>[
            'normalization_context'=> ['groups'=>[ 'read:profiles:collection']]
        ],
        'post' =>[
            'denormalization_context'=> ['groups'=>['profile:write']]
        ],
    ],
    itemOperations: [
        'put',
        'delete',
        'get',
        // recup id user
    ],
    normalizationContext: ['groups' => 'profile:read'],

    )]
class Profiles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["user:read", "profile:read"])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private ?int $age = null;

    #[ORM\Column]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private ?int $phone = null;

    #[ORM\OneToOne(inversedBy: 'profiles', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["profile:read", "profile:write", "read:profiles:collection"])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'profiles', targetEntity: ProfilePhotos::class, orphanRemoval: true)]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private Collection $profilePhotos;

    #[ORM\ManyToMany(targetEntity: Interests::class)]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private Collection $interests;


    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private ?string $biography = null;

    #[ORM\Column(length: 100)]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private ?string $firstname = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(["user:read", "user:write", "profile:read", "profile:write"])]
    private ?string $lastname = null;

    #[ORM\ManyToOne(cascade:["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["user:read", "profile:write", "profile:read", "read:profiles:collection"])]
    private ?Genders $genders = null;

    public function __construct()
    {
        $this->profilePhotos = new ArrayCollection();
        $this->interests = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, ProfilePhotos>
     */
    public function getProfilePhotos(): Collection
    {
        return $this->profilePhotos;
    }

    public function addProfilePhoto(ProfilePhotos $profilePhoto): self
    {
        if (!$this->profilePhotos->contains($profilePhoto)) {
            $this->profilePhotos->add($profilePhoto);
            $profilePhoto->setProfile($this);
        }

        return $this;
    }

    public function removeProfilePhoto(ProfilePhotos $profilePhoto): self
    {
        if ($this->profilePhotos->removeElement($profilePhoto)) {
            // set the owning side to null (unless already changed)
            if ($profilePhoto->getProfile() === $this) {
                $profilePhoto->setProfile(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, interests>
     */
    public function getInterests(): Collection
    {
        return $this->interests;
    }

    public function addInterest(Interests $interest): self
    {
        if (!$this->interests->contains($interest)) {
            $this->interests->add($interest);
        }

        return $this;
    }

    public function removeInterest(Interests $interest): self
    {
        $this->interests->removeElement($interest);

        return $this;
    }


    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): self
    {
        $this->biography = $biography;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getGenders(): ?Genders
    {
        return $this->genders;
    }

    public function setGenders(?Genders $genders): self
    {
        $this->genders = $genders;

        return $this;
    }
}
