package com.center.schoolmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.center.schoolmanagement.entity.User;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);
}
