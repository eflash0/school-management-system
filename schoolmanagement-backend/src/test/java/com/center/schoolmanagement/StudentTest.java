package com.center.schoolmanagement;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.center.schoolmanagement.controller.StudentController;
import com.center.schoolmanagement.entity.Student;
import com.center.schoolmanagement.repository.StudentRepository;
import com.center.schoolmanagement.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class StudentTest {

    // @Autowired
    // private MockMvc mockMvc;
    @MockBean
    private StudentRepository studentRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ObjectMapper objectMapper;



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
}
