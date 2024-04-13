package com.example.ex9_message_queue.repository;

import com.example.ex9_message_queue.entity.StatisticalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticalRepository extends JpaRepository<StatisticalEntity, Long> {
}
