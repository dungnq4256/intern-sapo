package com.example.ex9_message_queue.service.kafkaService;

import com.example.ex9_message_queue.entity.RequestEntity;
import com.example.ex9_message_queue.entity.StatisticalEntity;
import com.example.ex9_message_queue.repository.CategoryRepository;
import com.example.ex9_message_queue.repository.ProductRepository;
import com.example.ex9_message_queue.repository.StatisticalRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumer.class);

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final StatisticalRepository statisticalRepository;

    @KafkaListener(topics = "kafka-topic", groupId = "myGroup")
    public void consume(RequestEntity requestEntity) throws Exception {
        LOGGER.info(String.format("Consumed message -> %s", requestEntity));
        if(categoryRepository.findById(requestEntity.getCategoryId()).isPresent()){

            Integer totalQuantity = productRepository.statisticProduct(requestEntity.getCategoryId());

            StatisticalEntity statisticalEntity = new StatisticalEntity();
            statisticalEntity.setCategoryId(requestEntity.getCategoryId());
            statisticalEntity.setTotalQuantity(totalQuantity);
            statisticalEntity.setStatisticalDate(new Date());

            statisticalRepository.save(statisticalEntity);
        }
        else throw new Exception("Category not found!");
    }
}
