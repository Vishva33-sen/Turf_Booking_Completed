package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.userdto;
import com.example.Trufbooking.entity.usertable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userrepository extends JpaRepository<usertable,String> {

    Optional<usertable> findByEmail(String email);
    usertable findByUsername(String username);
    @Query("SELECT new com.example.Trufbooking.entity.userdto(u.username, u.email, u.mobile_number) FROM usertable u WHERE u.email = :email")
    userdto findUserDetailsByEmail(@Param("email") String email);
}
