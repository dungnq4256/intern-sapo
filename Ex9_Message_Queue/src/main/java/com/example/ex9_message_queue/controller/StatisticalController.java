package com.example.ex9_message_queue.controller;

import com.example.ex9_message_queue.dto.ProductQuantityDTO;
import com.example.ex9_message_queue.entity.RequestEntity;
import com.example.ex9_message_queue.entity.ResponseEntity;
import com.example.ex9_message_queue.entity.StatisticalEntity;
import com.example.ex9_message_queue.service.kafkaService.KafkaProducer;
import com.example.ex9_message_queue.repository.StatisticalRepository;
import com.example.ex9_message_queue.service.rabbitmqService.RabbitMQConsumer;
import com.example.ex9_message_queue.service.rabbitmqService.RabbitMQProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories/statistical")
@RequiredArgsConstructor
public class StatisticalController {

    private final KafkaProducer kafkaProducer;
    private final RabbitMQProducer rabbitMQProducer;
    private final RabbitMQConsumer rabbitMQConsumer;
    private final StatisticalRepository statisticalRepository;

    @GetMapping
    public List<StatisticalEntity> getAll(){
        return statisticalRepository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity statisticalOneCategory(@PathVariable Long id) {
        RequestEntity requestEntity = new RequestEntity();
        requestEntity.setCategoryId(id);
        kafkaProducer.sendMessage(requestEntity);
        return ResponseEntity.success("Message sent to Kafka successfully");
    }
    @GetMapping("/all")
    public ResponseEntity statisticalAllCategory() {
        rabbitMQProducer.sendMessage("statistical all");
        return ResponseEntity.success("Message sent to RabbitMQ successfully");
    }

}
