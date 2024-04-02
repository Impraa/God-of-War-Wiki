<?php

namespace App\Repository;

use App\Entity\Post;
use App\utils\HelperFunctions;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Post>
 *
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    use HelperFunctions;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function getPostsByCriteria(array $criteria, array $allPosts)
    {
        $sqlQuery = $this->createQueryBuilder('p');

        if (isset($criteria['searchQuery']) && $criteria['searchQuery'] != '') {
            $serachQuery = '%' . $this->getClosestResult($criteria['searchQuery'], $allPosts) . '%';
            $sqlQuery->andWhere('p.name like :name')->setParameter(':name', $serachQuery);
        }
        if (isset($criteria['filter']))
            $sqlQuery->andWhere('p.type like :type')->setParameter(':type', $criteria['filter']);
        if (isset($criteria['sort']))
            $sqlQuery->orderBy('p.name', $criteria['sort']);

        return $sqlQuery->getQuery()->execute();
    }

    //    /**
//     * @return Post[] Returns an array of Post objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    //    public function findOneBySomeField($value): ?Post
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
