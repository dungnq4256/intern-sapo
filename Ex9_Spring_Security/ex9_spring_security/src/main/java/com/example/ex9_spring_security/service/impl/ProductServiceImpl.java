package com.example.ex9_spring_security.service.impl;

import com.example.ex9_spring_security.dto.ProductSellTotalDTO;
import com.example.ex9_spring_security.entity.InventoryEntity;
import com.example.ex9_spring_security.entity.ProductEntity;
import com.example.ex9_spring_security.exception.AlreadyExistException;
import com.example.ex9_spring_security.exception.UnknowException;
import com.example.ex9_spring_security.reponsitory.ProductRepository;
import com.example.ex9_spring_security.service.ProductService;
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
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public List<ProductEntity> getAllProducts(){
        return productRepository.findAll();
    }
    @Override
    public Page<ProductEntity> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }
    @Override
    public Optional<ProductEntity> getProductById(Long id){
        Optional<ProductEntity> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isPresent()){
            return optionalProduct;
        }
        else throw new UnknowException("Product not found!");
    }
    @Override
    public Page<ProductEntity> getAllProductsByName(String name, Pageable pageable) {
        Page<ProductEntity> products = productRepository.findByProductName(name, pageable);
        if(!products.getContent().isEmpty()) {
            return products;
        }
        else throw new UnknowException("Empty list!");
    }
    @Override
    public Page<ProductEntity> filterProduct(String name, Long category_id, Long inventory_id, Pageable pageable) {
        Page<ProductEntity> products = productRepository.findByNameAndCategoryAndInventory(name, category_id, inventory_id, pageable);
        if(!products.getContent().isEmpty()) {
            return products;
        }
        else throw new UnknowException("Empty list!");
    }
    @Override
    public ProductEntity createNewProduct(ProductEntity product) {
        Optional<ProductEntity> optionalProduct = productRepository.findByProductCode(product.getCode());
        if(optionalProduct.isPresent()) throw new AlreadyExistException();
        return productRepository.save(product);
    }
    @Override
    @Modifying
    public void updateProduct(ProductEntity product) {
        ProductEntity oldProduct = productRepository.findById(product.getId()).get();
        oldProduct.setCode(product.getCode());
        oldProduct.setName(product.getName());
        oldProduct.setCategory_id(product.getCategory_id());
        oldProduct.setInventory_id(product.getInventory_id());
        oldProduct.setDescription(product.getDescription());
        oldProduct.setImage(product.getImage());
        oldProduct.setPrice(product.getPrice());
        oldProduct.setQuantity(product.getQuantity());
        oldProduct.setSell(product.getSell());
        productRepository.save(oldProduct);
    }
    @Override
    public void deleteProduct(Long id){
        ProductEntity optionalProduct = productRepository.findById(id).orElse(null);
        if (optionalProduct != null) {
            productRepository.deleteById(id);
        }
        else throw new UnknowException("Product not found");
    }
    @Override
    public List<ProductEntity> findByCategoryId(Long category_id){
        return productRepository.findByCategoryId(category_id);
    }
    @Override
    public List<ProductEntity> findByInventoryId(Long inventory_id){
        return productRepository.findByInventoryId(inventory_id);
    }

    @Override
    public List<ProductSellTotalDTO> getProductsListBestSellingEntity(Integer parameters){
        return productRepository.getProductsListBestSellingEntity(parameters)
                .stream().map(objects -> {
                    ProductSellTotalDTO productSellTotalDTO = new ProductSellTotalDTO();
                    productSellTotalDTO.setProduct_id(objects[0]);
                    productSellTotalDTO.setProduct_code(objects[1]);
                    productSellTotalDTO.setProduct_name(objects[2]);
                    productSellTotalDTO.setSell_total(objects[3]);
                    return productSellTotalDTO;
                }).collect(Collectors.toList());
    }
}
