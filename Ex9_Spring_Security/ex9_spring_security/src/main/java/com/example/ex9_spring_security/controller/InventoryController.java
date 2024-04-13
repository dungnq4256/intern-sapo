package com.example.ex9_spring_security.controller;


import com.example.ex9_spring_security.entity.InventoryEntity;
import com.example.ex9_spring_security.exception.UnknowException;
import com.example.ex9_spring_security.response.ServerResponse;
import com.example.ex9_spring_security.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/admin/inventories")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;
    @GetMapping("")
    public Page<InventoryEntity> getInventoriesList(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            return inventoryService.getAllInventoriesByName(name, pageable);
        }
        @GetMapping("/all")
        public List<InventoryEntity> getAllInventories(){
            return inventoryService.getAllInventories();
        }

    @GetMapping("/{id}")
    public ServerResponse getInventoryById(@PathVariable Long id){
        try{
            Optional<InventoryEntity> optionalInventory = inventoryService.getInventoryById(id);
            return ServerResponse.success("Get inventory information successfully!", optionalInventory);
        }
        catch (Exception exception){
            exception.printStackTrace();
            throw new UnknowException("Exception in getInventoryById method");
        }
    }
    @PostMapping("")
    public ServerResponse createNewInventory(@RequestBody InventoryEntity inventory){
            InventoryEntity newInventory = inventoryService.createNewInventory(inventory);
            return ServerResponse.success("Successfully added new Inventory!", newInventory);


    }
    @PutMapping("/{id}")
    public ServerResponse updateInventory(@PathVariable Long id, @RequestBody InventoryEntity inventory){
            inventory.setId(id);
            inventoryService.updateInventory(inventory);
            return ServerResponse.success("Inventory update successful!", null);
    }
    @DeleteMapping("/{id}")
    public ServerResponse deleteInventory(@PathVariable Long id){
        try{
            inventoryService.deleteInventory(id);
            return ServerResponse.success("Inventory delete successful!", null);
        }
        catch (Exception exception){
            exception.printStackTrace();
            throw new UnknowException("Exception in deleteInventory method");
        }
    }
}
