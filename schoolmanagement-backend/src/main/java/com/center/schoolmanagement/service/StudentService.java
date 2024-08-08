package com.center.schoolmanagement.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Course;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.repository.ClassroomRepository;
import com.center.schoolmanagement.repository.CourseRepository;
import com.center.schoolmanagement.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    ClassroomRepository classroomRepository;

    public Optional<Student> findById(Long id){
        return studentRepository.findById(id);
    }

    public Optional<Student> findByCode(String code){
        return studentRepository.findByCode(code);
    }

    public Student registerStudent(Student student){
        String code;
        Optional<Student> studentExist = studentRepository.findByCode(student.getCode());
        if(studentExist.isPresent())
            throw new IllegalArgumentException("the student is already existed");
        do{
            code = UUID.randomUUID().toString();
        } while(studentRepository.findByCode(code).isPresent());
        
        student.setCode(code.split("-")[0]);
        return studentRepository.save(student);    
    }

    public Student updateStudent(Student student,Long id){
        Student existingStudent = studentRepository.findById(id).
        orElseThrow(() -> new IllegalArgumentException("student doesn't exist"));
        if (student.getLastName() != null && !student.getLastName().isEmpty())
            existingStudent.setLastName(student.getLastName());
        if (student.getFirstName() != null && !student.getFirstName().isEmpty())
            existingStudent.setFirstName(student.getFirstName());
        if (student.getJoinDate() != null)
            existingStudent.setJoinDate(student.getJoinDate());
        if (student.getNationalCode() != null && !student.getNationalCode().isEmpty())
            existingStudent.setNationalCode(student.getNationalCode());
        if (student.getCourses() != null && !student.getCourses().isEmpty())
            existingStudent.setCourses(student.getCourses());
        if (student.getCode() != null && !student.getCode().isEmpty())
            existingStudent.setCode(student.getCode());
        
        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

    public List<Student> getStudents(){
        return studentRepository.findAll();
    }

    @Transactional
    public Student registerStudentInCourse(Long studentId,Long courseId){
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if(studentOpt.isPresent() && courseOpt.isPresent()){
            Student student = studentOpt.get();
            Course course = courseOpt.get();
            if(!student.getCourses().contains(course)){
                student.getCourses().add(course);
                return studentRepository.save(student);
            }
            else{
                throw new IllegalArgumentException("Student is already registered in the course");
            }
        }
        else {
            throw new IllegalArgumentException("Student or Course not found");
        }
    }

    @Transactional
    public Student unregisterStudentFromCourse(Long studentId,Long courseId){
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if(studentOpt.isPresent() && courseOpt.isPresent()){
            Student student = studentOpt.get();
            Course course = courseOpt.get();
            if(student.getCourses().contains(course)){
                student.getCourses().remove(course);
                return studentRepository.save(student);
            }
            else{
                throw new IllegalArgumentException("the student isn't registered in this course");
            }
        }
        else{
            throw new IllegalArgumentException("student or course not found");
        }
    }

    public List<Course> getStudentCourses(Long studentId){
        return studentRepository.findById(studentId)
        .orElseThrow(() -> new IllegalArgumentException("Student not found"))
        .getCourses();
    }

    @Transactional
    public Student registerStudentInClassroom(Long studentId,Long classroomId){
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Classroom> classroomOpt = classroomRepository.findById(classroomId);
        if(studentOpt.isPresent() && classroomOpt.isPresent()){
            Student student = studentOpt.get();
            Classroom classroom = classroomOpt.get();
            if(!student.getClassrooms().contains(classroom)){
                student.getClassrooms().add(classroom);
                return studentRepository.save(student);
            }
            else{
                throw new IllegalArgumentException("Student is already registered in the classroom");
            }
        }
        else {
            throw new IllegalArgumentException("Student or classroom not found");
        }
    }

    @Transactional
    public Student unregisterStudentFromClassroom(Long studentId,Long classroomId){
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        Optional<Classroom> classroomOpt = classroomRepository.findById(classroomId);
        if(studentOpt.isPresent() && classroomOpt.isPresent()){
            Student student = studentOpt.get();
            Classroom classroom = classroomOpt.get();
            if(student.getClassrooms().contains(classroom)){
                student.getClassrooms().remove(classroom);
                return studentRepository.save(student);
            }
            else{
                throw new IllegalArgumentException("the student isn't registered in this classroom");
            }
        }
        else{
            throw new IllegalArgumentException("student or classroom not found");
        }
    }

    public List<Classroom> getStudentClassrooms(Long studentId){
        return studentRepository.findById(studentId)
        .orElseThrow(() -> new IllegalArgumentException("Student not found"))
        .getClassrooms();
    }
}

