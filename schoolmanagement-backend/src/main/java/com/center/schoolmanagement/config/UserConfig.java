package com.center.schoolmanagement.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.center.schoolmanagement.entity.Role;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.service.StudentService;
import com.center.schoolmanagement.service.UserService;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserService userService,StudentService studentService){
        return args -> {
            User abdo= new User("abdo","fr",Role.ADMIN);
            User manal= new User("manal","fr",Role.ADMIN);
            userService.registerUser(abdo);
            userService.registerUser(manal);
            Student abdoStudent = new Student("abderrahim","arahi",LocalDate.of(2024, 7,30), "HH43909");
            Student manalStudent = new Student("manal","marsi",LocalDate.of(2024, 7,30), "HH20345");
            studentService.registerStudent(abdoStudent);
            studentService.registerStudent(manalStudent);
        };
    }
}
