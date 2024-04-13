package com.example.ex9_spring_security.controller;


import com.example.ex9_spring_security.dto.ProductQuantityDTO;
import com.example.ex9_spring_security.entity.CategoryEntity;
import com.example.ex9_spring_security.exception.UnknowException;
import com.example.ex9_spring_security.response.ServerResponse;
import com.example.ex9_spring_security.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/admin/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping("")
    public Page<CategoryEntity> getCategoriesList(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return categoryService.getAllCategoriesByName(name, pageable);
    }
    @GetMapping("/all")
    public List<CategoryEntity> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ServerResponse getCategoryById(@PathVariable Long id){
        try{
            Optional<CategoryEntity> optionalCategory = categoryService.getCategoryById(id);
            return ServerResponse.success("Get category information successfully!", optionalCategory);
        }
        catch (Exception exception){
            exception.printStackTrace();
            throw new UnknowException("Exception in getCategoryById method");
        }
    }
    @PostMapping("")
    public ServerResponse createNewCategory(@RequestBody CategoryEntity category) {
        CategoryEntity newCategory = categoryService.createNewCategory(category);
        return ServerResponse.success("Successfully added new category!", newCategory);
    }
    @PutMapping("/{id}")
    public ServerResponse updateCategory(@PathVariable Long id, @RequestBody CategoryEntity category){
            category.setId(id);
            categoryService.updateCategory(category);
            return ServerResponse.success("Category update successful!", null);


    }
    @DeleteMapping("/{id}")
    public ServerResponse deleteCategory(@PathVariable Long id){
        try{
            categoryService.deleteCategory(id);
            return ServerResponse.success("Category delete successful!", null);
        }
        catch (Exception exception){
            exception.printStackTrace();
            throw new UnknowException("Exception in deleteCategory method");
        }
    }
    @GetMapping("/sort-by-quantity-of-product")
    public List<ProductQuantityDTO> sortByQuantityOfProduct(){
        return categoryService.sortByQuantityOfProduct();
    }
}
