package com.center.schoolmanagement.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long classroomId;
    @Column(nullable = false,unique = true)
    @NotEmpty(message = "name can t be empty")
    private String name;
    @NotEmpty(message = "room can t be empty")
    @Column(nullable = false,unique = true)
    private String room;
    @OneToMany(mappedBy = "classroom",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Student> students;
    @ManyToOne
    @JoinColumn(name = "teacherId")
    private Teacher teacher;
    public Classroom(String name,String room) {
        this.name = name;
        this.room = room;
    }

    
}
