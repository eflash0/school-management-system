package com.center.schoolmanagement;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.center.schoolmanagement.entity.Classroom;
import com.center.schoolmanagement.entity.Teacher;
import com.center.schoolmanagement.repository.ClassroomRepository;
import com.center.schoolmanagement.repository.TeacherRepository;
import com.center.schoolmanagement.service.ClassroomService;
import com.center.schoolmanagement.service.TeacherService;

@SpringBootTest
public class TeacherTest {
    @InjectMocks
    private TeacherService teacherService;

    @Mock
    private TeacherRepository teacherRepository;

    @Mock
    private ClassroomRepository classroomRepository;

    @Mock
    private ClassroomService classroomService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterTeacher_WhenTeacherDoesNotExist() {
        Teacher teacher = new Teacher();
        teacher.setCode("gtrh");

        when(teacherRepository.findByCode(any())).thenReturn(Optional.empty());

        when(teacherRepository.save(any(Teacher.class))).thenReturn(teacher);

        Teacher savedTeacher = teacherService.registerTeacher(teacher);

        verify(teacherRepository).save(savedTeacher);
    }

    @Test
    public void registerTeacherInClassroom() throws Exception{
        Teacher teacher = new Teacher("john", "wick", "HH439467", LocalDate.of(2024, 7, 30));
        Classroom classroom = new Classroom("Artificial Intelligence1", "Room1");

        when(teacherRepository.findById(anyLong())).thenReturn(Optional.of(teacher));
        when(classroomRepository.findById(anyLong())).thenReturn(Optional.of(classroom));

        when(teacherRepository.save(any(Teacher.class))).thenReturn(teacher);

        Teacher updatedTeacher = teacherService.registerTeacherInClassroom(1L, 4L);

        assertNotNull(updatedTeacher, "Updated teacher should not be null");
        assertEquals(1, updatedTeacher.getClassrooms().size(), "Teacher should be registered in 1 classroom");
        assertEquals(teacher, classroom.getTeacher(), "Classroom should have the teacher assigned");
    }
}
