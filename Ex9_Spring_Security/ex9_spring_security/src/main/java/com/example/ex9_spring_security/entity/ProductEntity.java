package com.example.ex9_spring_security.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@NamedStoredProcedureQuery(name = "ProductEntity.getProductsListBestSellingEntity",
        procedureName = "get_products_list_best_selling", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "parameters", type = Integer.class)})
public class ProductEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    private String description;
    private BigDecimal price;
    private String image;
    private Integer quantity;
    private Integer sell;
    @Column(name = "inventory_id")
    private Long inventory_id;
    @Column(name = "category_id")
    private Long category_id;
}
