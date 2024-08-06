package com.center.schoolmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.center.schoolmanagement.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher,Long>{

}
