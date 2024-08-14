package com.center.schoolmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.entity.Teacher;
import com.center.schoolmanagement.repository.ClassroomRepository;
import com.center.schoolmanagement.repository.StudentRepository;
import com.center.schoolmanagement.repository.TeacherRepository;

@Service
public class ClassroomService {
    @Autowired
    ClassroomRepository classroomRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    StudentRepository studentRepository;

    public Optional<Classroom> findClassroomById(Long id){
        return classroomRepository.findById(id);
    }

    public Optional<Classroom> findClassroomByName(String name){
        return classroomRepository.findByName(name);
    }

    public List<Classroom> getClassrooms(){
        return classroomRepository.findAll();
    }

    public long countStudentsByClassrromId(Long classroomId){
        return classroomRepository.countStudentsByClassrromId(classroomId);
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
        return classroomRepository.save(existingClassroom);    
    }

    @Transactional
    public void deleteClassroom(Long id){
        Classroom classroom = classroomRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Classroom not found"));
        if(classroom.getTeacher() != null){
            Teacher teacher = classroom.getTeacher();
            teacher.getClassrooms().remove(classroom);
            teacherRepository.save(teacher);
        }
        classroomRepository.deleteById(id);
    }

    public List<Student> getClassroomStudents(Long classroomId){
        return classroomRepository.findById(classroomId)
        .orElseThrow(() -> new IllegalArgumentException("classroom not found"))
        .getStudents();
    }

    @Transactional
    public Classroom registerStudentInClassroom(Long classroomId,Long studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Classroom> classroomOpt = classroomRepository.findById(classroomId);
        if (studentOpt.isPresent() && classroomOpt.isPresent()) {
            Student student = studentOpt.get();
            Classroom classroom = classroomOpt.get();
            if (!classroom.getStudents().contains(student)) {
                classroom.getStudents().add(student);
                student.getClassrooms().add(classroom);
                Classroom updatedClassroom = classroomRepository.save(classroom);
                return updatedClassroom;
            } 
            else {
                throw new IllegalArgumentException("Student is already registered in the classroom");
            }
        } 
        else {
            throw new IllegalArgumentException("Student or classroom not found");
        }
    }

    @Transactional
    public Classroom unregisterStudentFromClassroom(Long classroomId,Long studentId){
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Classroom> classroomOpt = classroomRepository.findById(classroomId);
        if(studentOpt.isPresent() && classroomOpt.isPresent()){
            Student student = studentOpt.get();
            Classroom classroom = classroomOpt.get();
            if(classroom.getStudents().contains(student)){
                classroom.getStudents().remove(student);
                student.getClassrooms().remove(classroom);
                return classroomRepository.save(classroom);
            }
            else{
                throw new IllegalArgumentException("the Student isn't registered in this classroom");
            }
        }
        else{
            throw new IllegalArgumentException("Student or classroom not found");
        }
    }
}
