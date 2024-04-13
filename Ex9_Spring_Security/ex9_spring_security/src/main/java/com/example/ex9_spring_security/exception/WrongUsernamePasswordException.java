package com.example.ex9_spring_security.exception;

public class WrongUsernamePasswordException extends RuntimeException{
    public WrongUsernamePasswordException(String message) {
        super(message);
    }
}
