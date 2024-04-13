package com.example.ex9_spring_security.exception;

import com.example.ex9_spring_security.response.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleAllException(Exception ex, WebRequest request) {
        return new ErrorMessage(500, ex.getLocalizedMessage());
    }
    @ExceptionHandler(value =  UnauthorizedException.class)
    public ErrorMessage handleUnauthorizedException(UnauthorizedException exception) {
        return new ErrorMessage(401, "Token is invalid or expired");
    }

    @ExceptionHandler(value =  AlreadyExistException.class)
    public ResponseEntity<Object> handleAlreadyExistException(AlreadyExistException exception) {
        return new ResponseEntity<>("Already exist code", HttpStatus.NOT_IMPLEMENTED);
    }

    @ExceptionHandler(value = MyResourceNotFoundException.class)
    public ResponseEntity<Object> exception(MyResourceNotFoundException exception) {
        return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
    }


}
