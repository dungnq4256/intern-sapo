package com.example.ex9_message_queue.service.rabbitmqService;

import com.example.ex9_message_queue.dto.ProductQuantityDTO;
import com.example.ex9_message_queue.entity.StatisticalEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RabbitMQProducer {
    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQProducer.class);

    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(String message){
        LOGGER.info(String.format("Message sent -> %s", message));
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }
    public void sendJsonMessage(ProductQuantityDTO productQuantityDTO){
        LOGGER.info(String.format("Message sent -> %s", productQuantityDTO));
        rabbitTemplate.convertAndSend(exchange, routingKey, productQuantityDTO);
    };
}
