package com.center.schoolmanagement;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.center.schoolmanagement.controller.StudentController;
import com.center.schoolmanagement.entity.Course;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.repository.CourseRepository;
import com.center.schoolmanagement.repository.StudentRepository;
import com.center.schoolmanagement.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class StudentTest {

    // @Autowired
    // private MockMvc mockMvc;
    @Mock
    private StudentRepository studentRepository;

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private StudentService studentService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void registerStudentTest() throws Exception {
        Student example = new Student("first", "last", LocalDate.of(2000, 10, 20), "rgkeprgk");
        String studentJson = objectMapper.writeValueAsString(example);

        when(studentRepository.save(any(Student.class))).thenReturn(example);

        // RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/students")
        //         .accept(MediaType.APPLICATION_JSON)
        //         .contentType(MediaType.APPLICATION_JSON)
        //         .content(studentJson);

        // mockMvc.perform(requestBuilder)
        //         .andExpect(MockMvcResultMatchers.status().isCreated());

        Student rslt = studentService.registerStudent(example);
        assertNotNull(rslt);
        assertEquals("first", rslt.getFirstName());
        assertEquals("last", rslt.getLastName());
    }

    @Test
    public void registerStudentInCourseTest() throws Exception{
        Student student = new Student();
        student.setStudentId(1L);
        student.setFirstName("John");
        student.setLastName("Doe");

        Course course = new Course();
        course.setCourseId(1L);
        course.setName("Mathematics");

        when(studentRepository.findById(anyLong())).thenReturn(Optional.of(student));
        when(courseRepository.findById(anyLong())).thenReturn(Optional.of(course));
        when(studentRepository.save(student)).thenReturn(student);


        Student updatedStudent = studentService.registerStudentInCourse(1L, 1L);

        assertNotNull(updatedStudent);
        assertEquals("John", updatedStudent.getFirstName());
        assertEquals("Doe", updatedStudent.getLastName());
        assertEquals(1, updatedStudent.getCourses().size());
        assertEquals("Mathematics", updatedStudent.getCourses().iterator().next().getName());
    }
}
