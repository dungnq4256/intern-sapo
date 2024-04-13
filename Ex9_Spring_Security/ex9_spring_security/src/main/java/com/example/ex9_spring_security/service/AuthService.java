package com.example.ex9_spring_security.service;

import com.example.ex9_spring_security.exception.WrongUsernamePasswordException;
import com.example.ex9_spring_security.reponsitory.UserRepository;
import com.example.ex9_spring_security.security.JwtRequest;
import com.example.ex9_spring_security.security.JwtResponse;
import com.example.ex9_spring_security.security.JwtTokenProvider;
import com.example.ex9_spring_security.entity.User;
import com.example.ex9_spring_security.security.token.Token;
import com.example.ex9_spring_security.security.token.TokenRepository;
import com.example.ex9_spring_security.security.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public JwtResponse authenticate(@NotNull JwtRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername());
        var jwtToken = jwtTokenProvider.generateToken(user);
        var refreshToken = jwtTokenProvider.generateRefreshToken( user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return JwtResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        final String authHeader = request.getHeader("RefreshToken");
        final String refreshToken;
        final String username;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        username = jwtTokenProvider.extractUsername(refreshToken);
        if (username != null) {
            var user = this.userRepository.findByUsername(username);
            if (jwtTokenProvider.isTokenValid(refreshToken, user)) {
                var accessToken = jwtTokenProvider.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = JwtResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

}
