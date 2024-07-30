package com.center.schoolmanagement.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.center.schoolmanagement.entity.Role;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.service.UserService;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserService userService){
        return args -> {
            User abdo= new User("abdo","fr",Role.ADMIN);
            User manal= new User("manal","fr",Role.ADMIN);
            userService.registerUser(abdo);
            userService.registerUser(manal);
        };
    }
}
