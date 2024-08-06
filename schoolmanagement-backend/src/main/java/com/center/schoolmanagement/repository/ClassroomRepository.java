package com.center.schoolmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.center.schoolmanagement.entity.Classroom;

public interface ClassroomRepository extends JpaRepository<Classroom,Long>{

    
} 
