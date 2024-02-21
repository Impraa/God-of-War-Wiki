<?php

namespace App\utils;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

trait HelperFunctions
{
    public function transformData(Request $request): array
    {
        $content = $request->getContent();

        $explodedContent = explode("\r\n", $content);

        $values = [];

        foreach ($explodedContent as $index => $line) {
            if (strpos($line, 'Content-Disposition: form-data;') !== false) {
                $fieldName = explode('name="', $line)[1];
                $fieldName = rtrim($fieldName, '"');
                $value = $explodedContent[$index + 2];
                $values[$fieldName] = $value;
            }
        }

        return $values;
    }

    public function getUserFromToken(Request $request, JWTEncoderInterface $jwtManager, UserRepository $userRepository): User
    {
        $decodedToken = $jwtManager->decode($request->cookies->get("JWT_TOKEN"));
        $user = $userRepository->findOneBy(["username" => $decodedToken["username"]]);
        return $user;
    }
}