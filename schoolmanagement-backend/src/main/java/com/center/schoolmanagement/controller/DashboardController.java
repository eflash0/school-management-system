package com.center.schoolmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.center.schoolmanagement.repository.ClassroomRepository;
import com.center.schoolmanagement.repository.CourseRepository;
import com.center.schoolmanagement.repository.StudentRepository;
import com.center.schoolmanagement.repository.TeacherRepository;
import com.center.schoolmanagement.repository.UserRepository;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    ClassroomRepository classroomRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TeacherRepository teacherRepository;

    @GetMapping("/studentsCount")
    public long countStudents(){
        return studentRepository.count();
    }

    @GetMapping("/usersCount")
    public long countUsers(){
        return userRepository.count();
    }

    @GetMapping("/classroomsCount")
    public long countClassrooms(){
        return classroomRepository.count();
    }

    @GetMapping("/teachersCount")
    public long countTeachers(){
        return teacherRepository.count();
    }

    @GetMapping("/coursesCount")
    public long countCourses(){
        return courseRepository.count();
    }
}
