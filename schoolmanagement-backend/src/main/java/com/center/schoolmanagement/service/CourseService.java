package com.center.schoolmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.center.schoolmanagement.entity.Course;
import com.center.schoolmanagement.repository.CourseRepository;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public Optional<Course> findCourseById(Long id){
        return courseRepository.findById(id);
    }

    public Optional<Course> findCourseByName(String name){
        return courseRepository.findByName(name);
    }

    public List<Course> getCourses(){
        return courseRepository.findAll();
    }

    public Course addCourse(Course course){
        Optional<Course> existcourse = findCourseByName(course.getName());
        if(existcourse.isPresent())
            throw new IllegalArgumentException("the course already exists");
        return courseRepository.save(course);    
    }

    public Course updateCourse(Course course,Long id){
        Course existingCourse = courseRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("the course doesn't exist"));
        if(course.getName() != null && !course.getName().isEmpty())
            existingCourse.setName(course.getName());
        return courseRepository.save(existingCourse);    
    }

    public void deleteCourse(Long id){
        courseRepository.deleteById(id);
    }

    
}
