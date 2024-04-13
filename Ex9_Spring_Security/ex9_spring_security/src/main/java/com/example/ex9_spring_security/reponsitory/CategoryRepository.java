package com.example.ex9_spring_security.reponsitory;

import com.example.ex9_spring_security.entity.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    @Query(value = "select c.* from category as c where c.code = :code", nativeQuery = true)
    Optional<CategoryEntity> findByCategoryCode(@Param("code") String code);
    @Query("select c from CategoryEntity c where c.name like %:name%")
    Page<CategoryEntity> findByCategoryName(@Param("name") String name, Pageable pageable);

    @Query(value = "SELECT c.id, c.code, c.name, sum(p.quantity) AS quantity_product\n" +
            "FROM category c LEFT JOIN product p \n" +
            "ON p.category_id = c.id\n" +
            "GROUP BY c.id, c.code, c.name\n" +
            "ORDER BY quantity_product DESC", nativeQuery = true)
    List<Object[]> sortByQuantityOfProduct();
}
