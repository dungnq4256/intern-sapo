package com.example.ex9_spring_security.reponsitory;

import com.example.ex9_spring_security.entity.InventoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {
    @Query(value = "select i.* from inventory as i where i.code = :code", nativeQuery = true)
    Optional<InventoryEntity> findByInventoryCode(@Param("code") String code);
    @Query("select i from InventoryEntity i where i.name like %:name%")
    Page<InventoryEntity> findByInventoryName(@Param("name") String name, Pageable pageable);
}
