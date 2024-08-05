package com.center.schoolmanagement.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long classroomId;
    private String name;
    @OneToMany(mappedBy = "classroom",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Student> students;
    @ManyToOne
    @JoinColumn(name = "teacherId")
    private Teacher teacher;
}
