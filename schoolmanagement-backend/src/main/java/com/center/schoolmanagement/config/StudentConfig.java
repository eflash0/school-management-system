package com.center.schoolmanagement.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.service.StudentService;

@Configuration
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(StudentService studentService){
        return args -> {
            
        };
    }
}
