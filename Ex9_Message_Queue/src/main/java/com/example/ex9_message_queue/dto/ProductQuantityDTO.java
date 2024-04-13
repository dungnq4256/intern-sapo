package com.example.ex9_message_queue.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductQuantityDTO {
    private Object categoryId;
    private Object totalQuantity;
    private Date statisticalDate;

    @Override
    public String toString() {
        return "ProductQuantityDTO{" +
                "categoryId=" + categoryId +
                ", totalQuantity=" + totalQuantity +
                ", statisticalDate=" + statisticalDate +
                '}';
    }
}
