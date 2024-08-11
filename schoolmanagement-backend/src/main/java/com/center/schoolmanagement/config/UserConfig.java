package com.center.schoolmanagement.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Course;
import com.center.schoolmanagement.entity.Role;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.entity.Teacher;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.repository.TeacherRepository;
import com.center.schoolmanagement.service.ClassroomService;
import com.center.schoolmanagement.service.CourseService;
import com.center.schoolmanagement.service.StudentService;
import com.center.schoolmanagement.service.TeacherService;
import com.center.schoolmanagement.service.UserService;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserService userService,StudentService studentService,CourseService courseService,
    TeacherService teacherService,ClassroomService classroomService){
        return args -> {
            User abdo= new User("abdo","fr",Role.ADMIN);
            User manal= new User("manal","fr",Role.ADMIN);
            userService.registerUser(abdo);
            userService.registerUser(manal);
            Student abdoStudent = new Student("abderrahim","arahi",LocalDate.of(2024, 7,30), "HH43909");
            Student manalStudent = new Student("manal","marsi",LocalDate.of(2024, 7,30), "HH20345");
            studentService.registerStudent(abdoStudent);
            studentService.registerStudent(manalStudent);
            Course course1 = new Course("English");
            Course course2 = new Course("Physics");
            courseService.addCourse(course1);
            courseService.addCourse(course2);
            Teacher teacher1 = new Teacher("abderrahim","arahi","HH43909",LocalDate.of(2024, 7,30),course1);
            Teacher teacher2 = new Teacher("manal","marsi","HH42456",LocalDate.of(2024, 7,30),course2);
            teacherService.registerTeacher(teacher1);
            teacherService.registerTeacher(teacher2);
            Classroom classroom1 = new Classroom("Artificial Intelligence2","Room1");
            Classroom classroom2 = new Classroom("Computer Science1","Room2");
            classroomService.addClassroom(classroom1);
            classroomService.addClassroom(classroom2);
            studentService.registerStudentInClassroom(abdoStudent.getStudentId(), classroom2.getClassroomId());
            
            teacherService.registerTeacherInClassroom(teacher1.getTeacherId(),classroom2.getClassroomId());
            System.out.println(abdoStudent.getClassrooms().size()+"\n");
            System.out.println(teacher1.getClassrooms().size());
        };
    }
}
