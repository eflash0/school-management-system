package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.center.schoolmanagement.entity.Classroom;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long>{
    Optional<Classroom> findByName(String name);
    @Query("SELECT COUNT(s) FROM Classroom c JOIN c.students s WHERE c.classroomId = :classroomId")
    long countStudentsByClassrromId(Long classroomId);
    @Query("SELECT COUNT(c) FROM Classroom c")
    long countClassrooms();
} 
