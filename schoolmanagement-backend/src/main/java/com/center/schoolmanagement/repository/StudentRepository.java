package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Student;


@Repository
@Transactional(readOnly = true)
public interface StudentRepository extends JpaRepository<Student,Long>{
    Optional<Student> findByCode(String code);
    @Query("SELECT COUNT(c) FROM Student s JOIN s.courses c WHERE s.studentId = :studentId")
    long countCoursesByStudentId(Long studentId);
    @Query("SELECT COUNT(c) FROM Student s JOIN s.classrooms c WHERE s.studentId = :studentId")
    long countClassroomsByStudentId(Long studentId);
}
