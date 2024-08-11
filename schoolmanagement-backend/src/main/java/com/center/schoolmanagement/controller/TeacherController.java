package com.center.schoolmanagement.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.center.schoolmanagement.entity.Teacher;
import com.center.schoolmanagement.service.TeacherService;

@RestController
@RequestMapping(path = "/teachers")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;
    	
    @GetMapping
    public ResponseEntity<List<Teacher>> getTeachers(){
        List<Teacher> teachers = teacherService.getTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id){
        Optional<Teacher> Teacher = teacherService.findById(id);
        return Teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Object> addTeacher(@RequestBody Teacher teacher){
        Teacher savedTeacher = teacherService.registerTeacher(teacher);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(savedTeacher.getTeacherId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher teacher,@PathVariable Long id){
        try{
            Teacher updatedTeacher = teacherService.updateTeacher(teacher, id);
            return ResponseEntity.ok(updatedTeacher);
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
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id){
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{teacherId}/classrooms/{classroomId}")
    public ResponseEntity<Object> registerTeacherInclassroom(@PathVariable Long teacherId
    ,@PathVariable Long classroomId){
        try{
            Teacher updatedTeacher = teacherService.registerTeacherInClassroom(teacherId, classroomId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedTeacher.getTeacherId()).toUri();
            return ResponseEntity.created(location).body(updatedTeacher);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/{teacherId}/classrooms/{classroomId}")
    public ResponseEntity<Object> unregisterTeacherFromclassroom(@PathVariable Long teacherId,
    @PathVariable Long classroomId){
        try{
            Teacher updatedTeacher = teacherService.unregisterTeacherFromClassroom(teacherId, classroomId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(updatedTeacher.getTeacherId()).toUri();
            return ResponseEntity.created(location).body(updatedTeacher);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{teacherId}/classrooms")
    public ResponseEntity<List<Classroom>> getStudentClassrooms(@PathVariable Long teacherId) {
        List<Classroom> classrooms = teacherService.getTeacherClassrooms(teacherId);
        return ResponseEntity.ok(classrooms);
    }
}
