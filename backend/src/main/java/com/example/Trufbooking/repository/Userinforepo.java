package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Userinforepo extends JpaRepository<UserInfo, String> {
    UserInfo findByEmail(String email);
}
