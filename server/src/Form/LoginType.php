<?php

namespace App\Form;

use App\Entity\Post;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Validator\Constraints as Assert;


class LoginType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Username is manditaory field']),
                    new Assert\Length([
                        'min' => 3,
                        'minMessage' => 'Username is to short it must be 3 characters long at least.'
                    ])
                ]
            ])
            ->add(
                'password',
                PasswordType::class,
                [
                    'constraints' => [
                        new NotBlank(['message' => 'Password is manditaory field']),
                        new Assert\Length([
                            'min' => 8,
                            'minMessage' => 'Password is to short it must be 8 characters long at least.'
                        ])
                    ]
                ]
            )
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
