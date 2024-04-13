package com.example.ex9_spring_security.controller;

import com.example.ex9_spring_security.dto.ProductSellTotalDTO;
import com.example.ex9_spring_security.entity.ProductEntity;
import com.example.ex9_spring_security.exception.UnknowException;
import com.example.ex9_spring_security.response.ServerResponse;
import com.example.ex9_spring_security.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    @GetMapping("")
    public Page<ProductEntity> getProductsList(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return productService.getAllProductsByName(name, pageable);
    }

    @GetMapping("/filter")
    public Page<ProductEntity> filterProduct(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long category_id,
            @RequestParam(required = false) Long inventory_id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return  productService.filterProduct(name,category_id, inventory_id, pageable);
    }

    @GetMapping("/{id}")
    public ServerResponse getProductById(@PathVariable Long id){
        try{
            Optional<ProductEntity> optionalProduct = productService.getProductById(id);
            return ServerResponse.success("Get product information successfully!", optionalProduct);
        }
        catch (Exception exception){
            exception.printStackTrace();
            throw new UnknowException("Exception in getProductById method");
        }
    }


    @PostMapping("")
    public ServerResponse createNewProduct(@RequestBody ProductEntity product){
            ProductEntity newProduct = productService.createNewProduct(product);
            return ServerResponse.success("Successfully added new product!", newProduct);


    }
    @PutMapping("/{id}")
    public ServerResponse updateProduct(@PathVariable Long id, @RequestBody ProductEntity product){
            product.setId(id);
            productService.updateProduct(product);
            return ServerResponse.success("Product update successful!", null);


    }
    @DeleteMapping("/{id}")
    public ServerResponse deleteProduct(@PathVariable Long id){
        try{
            productService.deleteProduct(id);
            return ServerResponse.success("Product delete successful!", null);
        }
        catch (Exception exception){
            exception.printStackTrace();
            throw new UnknowException("Exception in deleteProduct method");
        }
    }
    @GetMapping("/best-selling")
    public List<ProductSellTotalDTO> getProductsListBestSellingEntity(@RequestParam Integer parameters){
        return productService.getProductsListBestSellingEntity(parameters);
    }
}
