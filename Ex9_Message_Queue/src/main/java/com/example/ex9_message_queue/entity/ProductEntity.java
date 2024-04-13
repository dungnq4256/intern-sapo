package com.example.ex9_message_queue.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "product")
@Data
public class ProductEntity {
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
    private Long inventoryId;
    @Column(name = "category_id")
    private Long categoryId;
    @CreatedDate
    @Column(name = "created_at")
    protected Timestamp createdAt;
    @LastModifiedDate
    @Column(name = "updated_at")
    protected Timestamp updatedAt;
}
