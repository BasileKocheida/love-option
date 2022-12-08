<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GendersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GendersRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'post',
    ],
    itemOperations: [
        'put',
        'delete',
        'get',
        // recup id user
    ],
    normalizationContext: ['groups' => 'gender:read'],
    denormalizationContext: ['groups' => 'gender:write']
)]
class Genders
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["gender:read", "profile:read", "profile:write"])]
    private ?int $id = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(["gender:read", "profile:read", "profile:write"])]
    private ?string $label = null;

    #[ORM\OneToMany(mappedBy: 'genders', targetEntity: Profiles::class)]
    private Collection $profiles;

    public function __construct()
    {
        $this->profiles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return Collection<int, Profiles>
     */
    public function getProfiles(): Collection
    {
        return $this->profiles;
    }

    public function addProfile(Profiles $profile): self
    {
        if (!$this->profiles->contains($profile)) {
            $this->profiles->add($profile);
            $profile->setGenders($this);
        }

        return $this;
    }

    public function removeProfile(Profiles $profile): self
    {
        if ($this->profiles->removeElement($profile)) {
            // set the owning side to null (unless already changed)
            if ($profile->getGenders() === $this) {
                $profile->setGenders(null);
            }
        }

        return $this;
    }
}
