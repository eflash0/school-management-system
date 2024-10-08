package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.Course;

@Repository
@Transactional(readOnly = true)
public interface CourseRepository extends JpaRepository<Course,Long> {
    Optional<Course> findByName(String name);
}
