package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Teacher;

@Repository
@Transactional(readOnly = true)
public interface TeacherRepository extends JpaRepository<Teacher,Long>{
    Optional<Teacher> findByCode(String code);
    @Query("SELECT COUNT(c) FROM Teacher t JOIN t.classrooms c WHERE t.teacherId = :teacherId")
    long countClassroomsByTeacherId(Long teacherId);
}
