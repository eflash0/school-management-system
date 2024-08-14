package com.center.schoolmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table
@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@ToString
@JsonIgnoreProperties({"classrooms"})
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long teacherId;
    @Column(nullable = false,unique = true)
    @NotEmpty(message = "code can t be empty")
    private String code;
    @Column(nullable = false)
    @NotEmpty(message = "first name can t be empty")
    private String firstName;
    @Column(nullable = false)
    @NotEmpty(message = "last name can t be empty")
    private String lastName;
    @Column(nullable = false,unique = true)
    @NotEmpty(message = "national code can t be empty")
    private String nationalCode;
    @Column(nullable = false)
    private LocalDate joinDate;
    @ManyToOne
    private Course course;
    @OneToMany(mappedBy = "teacher",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    List<Classroom> classrooms = new ArrayList<>();
    public Teacher(@NotEmpty(message = "first name can t be empty") String firstName,
            @NotEmpty(message = "last name can t be empty") String lastName,
            @NotEmpty(message = "national code can t be empty") String nationalCode, LocalDate joinDate
            ,Course course) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalCode = nationalCode;
        this.joinDate = joinDate;
        this.course = course;
    }

    public Teacher(@NotEmpty(message = "first name can t be empty") String firstName,
            @NotEmpty(message = "last name can t be empty") String lastName,
            @NotEmpty(message = "national code can t be empty") String nationalCode, LocalDate joinDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalCode = nationalCode;
        this.joinDate = joinDate;
    }
    
}
