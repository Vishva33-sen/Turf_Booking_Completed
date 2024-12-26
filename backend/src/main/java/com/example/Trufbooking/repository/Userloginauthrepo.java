package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.usertable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Userloginauthrepo extends JpaRepository<usertable,String> {
    Optional<usertable> findByEmail(String email);
}