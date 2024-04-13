package com.example.ex9_spring_security.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.sql.Timestamp;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {
    @CreatedDate
    @Column(name = "created_at")
    protected Timestamp created_at;
    @LastModifiedDate
    @Column(name = "updated_at")
    protected Timestamp updated_at;
}
