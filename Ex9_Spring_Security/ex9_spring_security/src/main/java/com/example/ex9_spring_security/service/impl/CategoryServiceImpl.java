package com.example.ex9_spring_security.service.impl;

import com.example.ex9_spring_security.dto.ProductQuantityDTO;
import com.example.ex9_spring_security.entity.CategoryEntity;
import com.example.ex9_spring_security.exception.AlreadyExistException;
import com.example.ex9_spring_security.exception.MyResourceNotFoundException;
import com.example.ex9_spring_security.exception.UnknowException;
import com.example.ex9_spring_security.reponsitory.CategoryRepository;
import com.example.ex9_spring_security.reponsitory.ProductRepository;
import com.example.ex9_spring_security.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    @Override
    public List<CategoryEntity> getAllCategories(){
        return categoryRepository.findAll();
    }
    @Override
    public Page<CategoryEntity> getAllCategoriesByName(String name, Pageable pageable) {
        Page<CategoryEntity> categories =categoryRepository.findByCategoryName(name, pageable);
        if (!categories.isEmpty()){
            return categories;
        }
        else throw new UnknowException("Empty list!");
    }
    @Override
    public Optional<CategoryEntity> getCategoryById(Long id){
        Optional<CategoryEntity> optionalCategory = categoryRepository.findById(id);
        if(optionalCategory.isPresent()){
            return optionalCategory;
        }
        else throw new UnknowException("Category not found!");
    }
    @Override
    public CategoryEntity createNewCategory(CategoryEntity category){
        Optional<CategoryEntity> optionalCategory = categoryRepository.findByCategoryCode(category.getCode());
        if(optionalCategory.isPresent()) throw new AlreadyExistException();
        else return categoryRepository.save(category);
    }
    @Override
    public void updateCategory(CategoryEntity category){
        Optional<CategoryEntity> optionalCategory = categoryRepository.findByCategoryCode(category.getCode());
        CategoryEntity oldCategory = categoryRepository.findById(category.getId()).get();
        if(optionalCategory.isPresent() && !Objects.equals(category.getCode(), oldCategory.getCode())) throw new AlreadyExistException();
        oldCategory.setCode(category.getCode());
        oldCategory.setName(category.getName());
        oldCategory.setDescription(category.getDescription());
        categoryRepository.save(oldCategory);
    }

    @Override
    @Modifying
    public void deleteCategory(Long id){
        List<Long> productIds = productRepository.findByCategoryId(id)
                .stream()
                .map(e -> e.getId())
                .collect(Collectors.toList());
        productRepository.deleteAllById(productIds);
        categoryRepository.deleteById(id);
    }
    @Override
    public List<ProductQuantityDTO> sortByQuantityOfProduct(){
        List<Object[]> objectList =  categoryRepository.sortByQuantityOfProduct();
        return objectList.stream().map(objects -> {
            ProductQuantityDTO productQuantityDTO = new ProductQuantityDTO();
            productQuantityDTO.setCategory_id(objects[0]);
            productQuantityDTO.setCategory_code(objects[1]);
            productQuantityDTO.setCategory_name(objects[2]);
            productQuantityDTO.setQuantity_product(objects[3]);
            return productQuantityDTO;
        }).collect(Collectors.toList());
    }
}
