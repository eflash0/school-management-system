package com.center.schoolmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.repository.ClassroomRepository;

@Service
public class ClassroomService {
    @Autowired
    ClassroomRepository classroomRepository;

    public Optional<Classroom> findClassroomById(Long id){
        return classroomRepository.findById(id);
    }

    public Optional<Classroom> findClassroomByName(String name){
        return classroomRepository.findByName(name);
    }

    public List<Classroom> getClassrooms(){
        return classroomRepository.findAll();
    }

    public Classroom addClassroom(Classroom classroom){
        Optional<Classroom> existClassroom = findClassroomByName(classroom.getName());
        if(existClassroom.isPresent())
            throw new IllegalArgumentException("the classroom already exists");
        return classroomRepository.save(classroom);    
    }

    public Classroom updateClassroom(Classroom classroom,Long id){
        Classroom existingClassroom = classroomRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("the classroom doesn't exist"));
        if(classroom.getName() != null && !classroom.getName().isEmpty())
            existingClassroom.setName(classroom.getName());
        if(classroom.getRoom() != null && !classroom.getRoom().isEmpty())
            existingClassroom.setRoom(classroom.getRoom());  
        if (classroom.getTeacher() != null)
            existingClassroom.setTeacher(classroom.getTeacher());
        if (classroom.getCourse() != null)
            existingClassroom.setCourse(classroom.getCourse());      
        return classroomRepository.save(existingClassroom);    
    }

    public void deleteClassroom(Long id){
        classroomRepository.deleteById(id);
    }

    public List<Student> getClassroomStudents(Long classroomId){
        return classroomRepository.findById(classroomId)
        .orElseThrow(() -> new IllegalArgumentException("classroom not found"))
        .getStudents();
    }
}
