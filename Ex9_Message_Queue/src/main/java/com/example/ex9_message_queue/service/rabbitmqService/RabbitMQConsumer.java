package com.example.ex9_message_queue.service.rabbitmqService;

import com.example.ex9_message_queue.dto.ProductQuantityDTO;
import com.example.ex9_message_queue.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RabbitMQConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);

    private final ProductRepository productRepository;

    @RabbitListener(queues = {"${rabbitmq.queue.name}"})
    public void consumeJsonMessage(List<ProductQuantityDTO> productQuantityDTOS){
        LOGGER.info(String.format("Received message -> %s", productQuantityDTOS));
    }

    @RabbitListener(queues = {"${rabbitmq.queue.name}"})
    public void consumeMessage(String message){
        LOGGER.info(String.format("Received message -> %s", message));
        if(Objects.equals(message, "statistical all")){
           List<Object[]> objectList = productRepository.statisticAll();
            List<ProductQuantityDTO> productQuantityDTOs = objectList.stream().map(objects -> {
                ProductQuantityDTO productQuantityDTO = new ProductQuantityDTO();
                productQuantityDTO.setCategoryId(objects[0]);
                productQuantityDTO.setTotalQuantity(objects[1]);
                productQuantityDTO.setStatisticalDate(new Date());
                LOGGER.info(String.format("Statistic -> %s", productQuantityDTO.toString()));
                return productQuantityDTO;
            }).toList();
        }
    }
}
