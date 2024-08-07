package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.center.schoolmanagement.entity.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Long>{
    Optional<Teacher> findByCode(String code);
}
