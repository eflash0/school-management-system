package com.center.schoolmanagement.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Teacher;
import com.center.schoolmanagement.repository.ClassroomRepository;
import com.center.schoolmanagement.repository.TeacherRepository;

@Service
public class TeacherService {
    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    ClassroomRepository classroomRepository;

    public Optional<Teacher> findById(Long id){
        return teacherRepository.findById(id);
    }

    public Optional<Teacher> findByCode(String code){
        return teacherRepository.findByCode(code);
    }

    public Teacher registerTeacher(Teacher teacher){
        String code;
        Optional<Teacher> teacherExist = teacherRepository.findByCode(teacher.getCode());
        if(teacherExist.isPresent())
            throw new IllegalArgumentException("the Teacher is already existed");
        do{
            code = UUID.randomUUID().toString();
        } while(teacherRepository.findByCode(code).isPresent());
        
        teacher.setCode(code.split("-")[0]);
        return teacherRepository.save(teacher);    
    }

    public Teacher updateTeacher(Teacher teacher,Long id){
        Teacher existingTeacher = teacherRepository.findById(id).
        orElseThrow(() -> new IllegalArgumentException("Teacher doesn't exist"));
        if (teacher.getLastName() != null && !teacher.getLastName().isEmpty())
            existingTeacher.setLastName(teacher.getLastName());
        if (teacher.getFirstName() != null && !teacher.getFirstName().isEmpty())
            existingTeacher.setFirstName(teacher.getFirstName());
        if (teacher.getJoinDate() != null)
            existingTeacher.setJoinDate(teacher.getJoinDate());
        if (teacher.getNationalCode() != null && !teacher.getNationalCode().isEmpty())
            existingTeacher.setNationalCode(teacher.getNationalCode());
        if (teacher.getClassrooms() != null && !teacher.getClassrooms().isEmpty())
            existingTeacher.setClassrooms(teacher.getClassrooms());
        if (teacher.getCode() != null && !teacher.getCode().isEmpty())
            existingTeacher.setCode(teacher.getCode());
        
        return teacherRepository.save(existingTeacher);
    }

    public void deleteTeacher(Long id){
        teacherRepository.deleteById(id);
    }

    public List<Teacher> getTeachers(){
        return teacherRepository.findAll();
    }

    @Transactional
    public Teacher registerTeacherInClassroom(Long teacherId,Long classroomId){
        Optional<Teacher> teacherOpt = teacherRepository.findById(teacherId);
        Optional<Classroom> classroomOpt = classroomRepository.findById(classroomId);
        if(teacherOpt.isPresent() && classroomOpt.isPresent()){
            Teacher teacher = teacherOpt.get();
            Classroom classroom = classroomOpt.get();
            if(!teacher.getClassrooms().contains(classroom)){
                teacher.getClassrooms().add(classroom);
                return teacherRepository.save(teacher);
            }
            else{
                throw new IllegalArgumentException("Teacher is already registered in the classroom");
            }
        }
        else {
            throw new IllegalArgumentException("Teacher or classroom not found");
        }
    }

    @Transactional
    public Teacher unregisterTeacherFromClassroom(Long teacherId,Long classroomId){
        Optional<Teacher> teacherOpt = teacherRepository.findById(teacherId);
        Optional<Classroom> classroomOpt = classroomRepository.findById(classroomId);
        if(teacherOpt.isPresent() && classroomOpt.isPresent()){
            Teacher teacher = teacherOpt.get();
            Classroom classroom = classroomOpt.get();
            if(teacher.getClassrooms().contains(classroom)){
                teacher.getClassrooms().remove(classroom);
                return teacherRepository.save(teacher);
            }
            else{
                throw new IllegalArgumentException("the teacher isn't registered in this classroom");
            }
        }
        else{
            throw new IllegalArgumentException("teacher or classroom not found");
        }
    }
}
