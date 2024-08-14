package com.center.schoolmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.center.schoolmanagement.repository.CourseRepository;
import com.center.schoolmanagement.repository.StudentRepository;

@RestController
public class DashboardController {
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    StudentRepository studentRepository;
    //to be continued
}
