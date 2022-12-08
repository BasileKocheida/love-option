<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\PasswordHasher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class UserController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    #[Route(
        name: 'getUserInfo',
        path: '/me',
        methods: ['GET'],
        defaults: [
            '_api_resource_class' => User::class,
            '_api_item_operation_name' => 'me',
        ],
    )]

    public function __invoke(Request $request)
    {
        return $this->getUser();
    }

    // json response
    public function me(Request $request)
    {
        return $this->getUser();
    }

    #[Route(
        name: 'createUser',
        path: '/users',
        methods: ['POST'],
    )]
    public function createUser(Request $request, PasswordHasher $passwordHasher)
    {
        $user = new User();
        $user->setEmail($request->toArray()['email']);
        $user->setPassword($passwordHasher->hash($request->toArray()['plainPassword']));
        $this->userRepository->add($user, true);
        return new JsonResponse(['message' => 'User created', "user"=>$user], Response::HTTP_CREATED);
    }
}
