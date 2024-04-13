package com.example.ex9_spring_security.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ServerResponse {
    private int status;
    private String message;
    private Object data;

    public ServerResponse(int status, Object data) {
        this.status = status;
        this.data = data;
    }

    public static ServerResponse success(int status, String message) {
        return new ServerResponse(status, message);
    }

    public static ServerResponse success(String message) {
        return new ServerResponse(HttpStatus.OK.value(), message);
    }

    public static ServerResponse success(int status, String message, Object data) {
        return new ServerResponse(status, message, data);
    }

    public static ServerResponse success(String message, Object data) {
        return new ServerResponse(HttpStatus.OK.value(), message, data);
    }

    public static ServerResponse error(int status, String message) {
        return new ServerResponse(status, message, null);
    }
}
