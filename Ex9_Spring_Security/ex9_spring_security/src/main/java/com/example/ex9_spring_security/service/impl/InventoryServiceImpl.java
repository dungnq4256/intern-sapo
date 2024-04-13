package com.example.ex9_spring_security.service.impl;

import com.example.ex9_spring_security.entity.CategoryEntity;
import com.example.ex9_spring_security.entity.InventoryEntity;
import com.example.ex9_spring_security.exception.AlreadyExistException;
import com.example.ex9_spring_security.exception.UnknowException;
import com.example.ex9_spring_security.reponsitory.InventoryRepository;
import com.example.ex9_spring_security.reponsitory.ProductRepository;
import com.example.ex9_spring_security.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryServiceImpl implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    @Override
    public List<InventoryEntity> getAllInventories(){
        return inventoryRepository.findAll();
    }
    @Override
    public Page<InventoryEntity> getAllInventoriesByName(String name, Pageable pageable) {
        Page<InventoryEntity> inventories =  inventoryRepository.findByInventoryName(name, pageable);
        if (!inventories.isEmpty()){
            return inventories;
        }
        else throw new UnknowException("Empty list!");
    }
    @Override
    public Optional<InventoryEntity> getInventoryById(Long id){
        Optional<InventoryEntity> optionalInventory = inventoryRepository.findById(id);
        if(optionalInventory.isPresent()){
            return optionalInventory;
        }
        else throw new UnknowException("Inventory not found!");
    }

    @Override
    public InventoryEntity createNewInventory(InventoryEntity inventory) {
        Optional<InventoryEntity> optionalInventory = inventoryRepository.findByInventoryCode(inventory.getCode());
        if(optionalInventory.isPresent()) throw new AlreadyExistException();
        return inventoryRepository.save(inventory);
    }
    @Override
    @Modifying
    public void updateInventory(InventoryEntity inventory) {
        Optional<InventoryEntity> optionalInventory = inventoryRepository.findByInventoryCode(inventory.getCode());
        InventoryEntity oldInventory = inventoryRepository.findById(inventory.getId()).get();
        if(optionalInventory.isPresent() && !Objects.equals(inventory.getCode(), oldInventory.getCode())) throw new AlreadyExistException();
        oldInventory.setCode(inventory.getCode());
        oldInventory.setName(inventory.getName());
        oldInventory.setAddress(inventory.getAddress());
        inventoryRepository.save(oldInventory);
    }

    @Override
    @Modifying
    public void deleteInventory(Long id){
        List<Long> productIds = productRepository.findByInventoryId(id)
                .stream()
                .map(e -> e.getId())
                .collect(Collectors.toList());
        productRepository.deleteAllById(productIds);
            inventoryRepository.deleteById(id);
    }
}
