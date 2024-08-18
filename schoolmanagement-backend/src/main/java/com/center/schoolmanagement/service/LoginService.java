package com.center.schoolmanagement.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.center.schoolmanagement.dto.LoginResponse;
import com.center.schoolmanagement.dto.UserDto;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.security.JwtUtil;

@Service
public class LoginService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;

    public String login(User user) {
        // LoginResponse response = new LoginResponse();   
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            // response.setSuccess(true);
            // response.setMessage("login successful");
            String roles = authentication.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.joining(","));
            return jwtTokenUtil.generateToken(authentication.getName(),roles);
        } catch (AuthenticationException e) {
            // response.setSuccess(false);
            // response.setMessage("login failed");
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }
}
