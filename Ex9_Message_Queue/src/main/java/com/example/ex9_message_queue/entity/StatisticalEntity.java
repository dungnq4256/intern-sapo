package com.example.ex9_message_queue.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "statistical")
@Data
public class StatisticalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "category_id")
    private Long categoryId;
    @Column(name = "total_quantity")
    private Integer totalQuantity;
    @Column(name = "statistical_date")
    private Date statisticalDate;
}
