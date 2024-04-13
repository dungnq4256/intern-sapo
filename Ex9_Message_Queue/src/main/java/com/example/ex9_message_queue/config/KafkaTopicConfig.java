package com.example.ex9_message_queue.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    public NewTopic kafkaTopic() {
        return TopicBuilder.name("kafka-topic").build();
    }
}
