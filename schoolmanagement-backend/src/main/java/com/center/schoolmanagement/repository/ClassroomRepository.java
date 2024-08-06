package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.center.schoolmanagement.entity.Classroom;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long>{
    Optional<Classroom> findByName(String name);
} 
