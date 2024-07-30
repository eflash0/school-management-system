package com.center.schoolmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.center.schoolmanagement.entity.Role;
import com.center.schoolmanagement.entity.User;
import com.center.schoolmanagement.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;
    private final static String MSG="user with username %s not found";
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> 
        new UsernameNotFoundException(String.format(MSG,username)));
    }

    public Optional<User> findUserById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> findUserbyUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User registerUser(User user){
        Optional<User> existUser = userRepository.findByUsername(user.getUsername());
        if(existUser.isPresent())
            throw new IllegalArgumentException("the user is already existed");
        String encodedPass = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        userRepository.save(user);
        return user;    
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public User updateUser(User user, Long id) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User doesn't exist"));
    
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        if (user.getUsername() != null && !user.getUsername().isEmpty()) {
            existingUser.setUsername(user.getUsername());
        }
        if (user.getRole() != null) {
            try {
                Role role = user.getRole();
                existingUser.setRole(role);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role: " + user.getRole());
            }
        }
        return userRepository.save(existingUser);
    }
    

}
