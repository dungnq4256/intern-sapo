package com.example.ex9_spring_security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductQuantityDTO {
    private Object category_id;
    private Object category_code;
    private Object category_name;
    private Object quantity_product;
}
