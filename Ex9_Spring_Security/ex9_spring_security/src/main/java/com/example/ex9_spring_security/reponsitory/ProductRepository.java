package com.example.ex9_spring_security.reponsitory;

import com.example.ex9_spring_security.entity.InventoryEntity;
import com.example.ex9_spring_security.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAll(Pageable pageable);
    @Query(value = "select p.* from product as p where p.id = :id", nativeQuery = true)
    List<ProductEntity> findByCategoryId(@Param("id") Long id);

    @Query(value = "select p.* from product as p where p.id = :id", nativeQuery = true)
    List<ProductEntity> findByInventoryId(@Param("id") Long id);

    @Query("select p from ProductEntity p where p.name like %:name%")
    Page<ProductEntity> findByProductName(@Param("name") String name, Pageable pageable);

    @Query(value = "select p.* from product as p where p.code = :code", nativeQuery = true)
    Optional<ProductEntity> findByProductCode(@Param("code") String code);

    @Query("select p from ProductEntity p " +
            "where p.name like %:name% " +
            "and p.category_id = :category_id " +
            "and p.inventory_id = :inventory_id ")
    Page<ProductEntity> findByNameAndCategoryAndInventory(
            @Param("name") String name,
            @Param("category_id") Long category_id,
            @Param("inventory_id") Long inventory_id,
            Pageable pageable);
    @Procedure(name = "ProductEntity.getProductsListBestSellingEntity")
    List<Object[]> getProductsListBestSellingEntity(@Param("parameters") Integer quantity);

    @Override
    void deleteAllById(Iterable<? extends Long> longs);
}
