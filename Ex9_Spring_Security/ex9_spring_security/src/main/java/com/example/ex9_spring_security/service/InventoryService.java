package com.example.ex9_spring_security.service;

import com.example.ex9_spring_security.entity.InventoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface InventoryService {
     List<InventoryEntity> getAllInventories();
     Page<InventoryEntity> getAllInventoriesByName(String name, Pageable pageable);
     Optional<InventoryEntity> getInventoryById(Long id);
     InventoryEntity createNewInventory(InventoryEntity inventory);
     void updateInventory(InventoryEntity inventory);
     void deleteInventory(Long id);
}
