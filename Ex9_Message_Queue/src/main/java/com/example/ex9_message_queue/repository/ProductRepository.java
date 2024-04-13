package com.example.ex9_message_queue.repository;

import com.example.ex9_message_queue.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Query(value = "SELECT sum(quantity) as total_quantity FROM product WHERE category_id = ?", nativeQuery = true)
    Integer statisticProduct(@Param("categoryId") Long categoryId);

    @Query(value = "SELECT c.id as categoryId, sum(p.quantity) AS totalQuantity\n" +
            "FROM category c LEFT JOIN product p\n" +
            "ON p.category_id = c.id\n" +
            "GROUP BY c.id\n" +
            "ORDER BY totalQuantity", nativeQuery = true)
    List<Object[]> statisticAll();
}
