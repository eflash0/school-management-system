package com.center.schoolmanagement.controller;

import org.springframework.web.bind.annotation.RestController;
import com.center.schoolmanagement.dto.JwtResponse;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.security.JwtUtil;
import com.center.schoolmanagement.service.LoginService;
import com.center.schoolmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping(path = "/")
public class LoginController {
    @Autowired
    LoginService loginService;
    @Autowired
    UserService userService;
    @Autowired
    JwtUtil jwtUtil;
    
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user){
        String token = loginService.login(user);
        // if(loginResponse.isSuccess())
        //     return ResponseEntity.ok(loginResponse);
        // return ResponseEntity.status(401).body(loginResponse);  
        return ResponseEntity.ok(new JwtResponse(token)); 
    }

    @PostMapping(path = "validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestBody String token){
        Boolean valid=jwtUtil.validateToken(token);
        System.out.println(valid);
        return ResponseEntity.ok(valid);
    }

}
