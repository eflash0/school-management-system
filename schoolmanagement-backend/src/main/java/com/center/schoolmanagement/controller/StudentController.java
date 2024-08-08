package com.center.schoolmanagement.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Course;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.service.StudentService;

@RestController
@RequestMapping(path = "/students")
public class StudentController {
    @Autowired
    private StudentService studentService;
    	
    @GetMapping
    public ResponseEntity<List<Student>> getStudents(){
        List<Student> students = studentService.getStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id){
        Optional<Student> student = studentService.findById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Object> addStudent(@RequestBody Student student){
        Student savedStudent = studentService.registerStudent(student);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(savedStudent.getStudentId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student,@PathVariable Long id){
        try{
            Student updatedStudent = studentService.updateStudent(student, id);
            return ResponseEntity.ok(updatedStudent);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Object> registerStudentInCourse(@PathVariable Long studentId
    ,@PathVariable Long courseId){
        try{
            Student updatedStudent = studentService.registerStudentInCourse(studentId, courseId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedStudent.getStudentId()).toUri();
            return ResponseEntity.created(location).body(updatedStudent);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{studentId}/courses/{courseId}")
    public ResponseEntity<Object> unregisterStudentFromCourse(@PathVariable Long studentId,
    @PathVariable Long courseId){
        try{
            Student updatedStudent = studentService.unregisterStudentFromCourse(studentId, courseId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedStudent.getStudentId()).toUri();
            return ResponseEntity.created(location).body(updatedStudent);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{studentId}/courses")
    public ResponseEntity<List<Course>> getStudentCourses(@PathVariable Long studentId) {
        List<Course> courses = studentService.getStudentCourses(studentId);
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/{studentId}/classrooms/{classroomId}")
    public ResponseEntity<Object> registerStudentInClassroom(@PathVariable Long studentId
    ,@PathVariable Long classroomId){
        try{
            Student updatedStudent = studentService.registerStudentInClassroom(studentId, classroomId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedStudent.getStudentId()).toUri();
            return ResponseEntity.created(location).body(updatedStudent);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{studentId}/classrooms/{classroomId}")
    public ResponseEntity<Object> unregisterStudentFromClassroom(@PathVariable Long studentId,
    @PathVariable Long classroomId){
        try{
            Student updatedStudent = studentService.unregisterStudentFromClassroom(studentId, classroomId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedStudent.getStudentId()).toUri();
            return ResponseEntity.created(location).body(updatedStudent);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{studentId}/classrooms")
    public ResponseEntity<List<Classroom>> getStudentClassrooms(@PathVariable Long studentId) {
        List<Classroom> classrooms = studentService.getStudentClassrooms(studentId);
        return ResponseEntity.ok(classrooms);
    }
}
