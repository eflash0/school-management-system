package com.center.schoolmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.entity.Teacher;
import com.center.schoolmanagement.service.ClassroomService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/classrooms")
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @GetMapping
    public ResponseEntity<List<Classroom>> getClassrooms() {
        List<Classroom> classrooms = classroomService.getClassrooms();
        return ResponseEntity.ok(classrooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classroom> getClassroomById(@PathVariable Long id) {
        Optional<Classroom> classroomOpt = classroomService.findClassroomById(id);
        return classroomOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Classroom> addClassroom(@RequestBody Classroom Classroom) {
        Classroom savedClassroom = classroomService.addClassroom(Classroom);
        URI location = URI.create(String.format("/classrooms/%s", savedClassroom.getClassroomId()));
        return ResponseEntity.created(location).body(savedClassroom);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Classroom> updateClassroom(@RequestBody Classroom classroom, @PathVariable Long id) {
        Classroom updatedClassroom = classroomService.updateClassroom(classroom, id);
        return ResponseEntity.ok(updatedClassroom);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable Long id) {
        classroomService.deleteClassroom(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{classroomId}/students")
    public ResponseEntity<List<Student>> getClassroomStudents(@PathVariable Long classroomId){
        List<Student> students = classroomService.getClassroomStudents(classroomId);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{classroomId}/students/count")
    public long countStudentsByClassrromId(@PathVariable Long classroomId){
        return classroomService.countStudentsByClassrromId(classroomId);
    }

    @PostMapping("/{classroomId}/students/{studentId}")
    public ResponseEntity<Object> registerStudentInClassroom(@PathVariable Long classroomId,@PathVariable Long studentId){
        try{
            Classroom updatedClassroom = classroomService.registerStudentInClassroom(classroomId,studentId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}")
            .buildAndExpand(updatedClassroom.getClassroomId()).toUri();
            return ResponseEntity.ok(location);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/{classroomId}/students/{studentId}")
    public ResponseEntity<Object> unregisterStudentrFromclassroom(@PathVariable Long classroomId,
    @PathVariable Long studentId){
        try{
            Classroom updatedClassroom = classroomService.unregisterStudentFromClassroom(classroomId, studentId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedClassroom.getClassroomId()).toUri();
            return ResponseEntity.created(location).body(updatedClassroom);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
