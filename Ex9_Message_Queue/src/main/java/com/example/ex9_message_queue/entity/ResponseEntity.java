package com.example.ex9_message_queue.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.function.ServerResponse;

@Data
@AllArgsConstructor
public class ResponseEntity {

    private int status;
    private String message;

    public static ResponseEntity success(int status, String message) {
        return new ResponseEntity(status, message);
    }

    public static ResponseEntity success(String message) {
        return new ResponseEntity(HttpStatus.OK.value(), message);
    }

    public static ResponseEntity error(int status, String message) {
        return new ResponseEntity(status, message);
    }
}

