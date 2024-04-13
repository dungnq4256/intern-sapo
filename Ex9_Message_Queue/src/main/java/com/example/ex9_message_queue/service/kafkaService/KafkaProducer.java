package com.example.ex9_message_queue.service.kafkaService;

import com.example.ex9_message_queue.entity.RequestEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaProducer.class);
    private static final String TOPIC = "kafka-topic";
    private final KafkaTemplate<String, RequestEntity> kafkaTemplate;
    public void sendMessage(RequestEntity requestEntity) {

        LOGGER.info(String.format("Produced message -> %s", requestEntity.toString()));

        Message<RequestEntity> message = MessageBuilder
                .withPayload(requestEntity)
                .setHeader(KafkaHeaders.TOPIC, TOPIC)
                .build();
        kafkaTemplate.send(message);
    }
}
