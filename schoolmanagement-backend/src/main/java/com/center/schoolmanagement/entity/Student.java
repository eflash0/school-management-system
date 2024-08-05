package com.center.schoolmanagement.entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;
    private String firstName;
    private String lastName;
    private String code;
    private LocalDate joinDate;
    private String nationalCode;
    // @Transient
    // private int age;
    
    @ManyToMany
    @JoinTable(name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id"),
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id","course_id"})
    )
    private List<Course> courses = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "classroomId")
    private Classroom classroom;

    public Student(String firstName, String lastName,String code, LocalDate joinDate, String nationalCode, List<Course> courses) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.joinDate = joinDate;
        this.nationalCode = nationalCode;
        this.courses = courses;
        this.code = code;
    };

    public Student(String firstName, String lastName, LocalDate joinDate, String nationalCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.joinDate = joinDate;
        this.nationalCode = nationalCode;
    };

    
}
