package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Student;


@Repository
@Transactional(readOnly = true)
public interface StudentRepository extends JpaRepository<Student,Long>{
    Optional<Student> findByCode(String code);
}
