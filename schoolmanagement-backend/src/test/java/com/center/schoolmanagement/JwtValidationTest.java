package com.center.schoolmanagement;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.center.schoolmanagement.controller.LoginController;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.security.JwtUtil;
import com.center.schoolmanagement.service.LoginService;
import com.center.schoolmanagement.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(LoginController.class)
@ExtendWith(SpringExtension.class)
public class JwtValidationTest {
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    LoginService loginService;

    // @Test
    // public void testValidateToken() throws Exception{
    //     when(jwtUtil.validateToken(anyString())).thenReturn(true);
    //     RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/validate-token")
    //     .content("mock-token");
    //     MvcResult result = mockMvc.perform(requestBuilder)
    //     .andExpect(MockMvcResultMatchers.status().isOk())
    //     .andExpect(MockMvcResultMatchers.content().string("true")).andReturn();
    // }

    // @Test
    // public void testLogin() throws Exception{
    //     User example = new User();
    //     example.setUsername("test");
    //     example.setPassword("pass");

    //     //convert user to json
    //     String userJson = objectMapper.writeValueAsString(example);

    //     String token = "token";
    //     when(loginService.login(any(User.class))).thenReturn(token);

    //     RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/login")
    //     .content(userJson)
    //     .contentType(MediaType.APPLICATION_JSON);

    //     MvcResult result = mockMvc.perform(requestBuilder)
    //     .andExpect(MockMvcResultMatchers.status().isOk())
    //     .andExpect(MockMvcResultMatchers.content().json("{\"token\":\""+token+"\"}"))
    //     .andReturn();
    // }

}
