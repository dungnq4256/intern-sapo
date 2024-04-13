package com.example.ex9_spring_security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductSellTotalDTO {
    private Object product_id;
    private Object product_code;
    private Object product_name;
    private Object sell_total;
}
