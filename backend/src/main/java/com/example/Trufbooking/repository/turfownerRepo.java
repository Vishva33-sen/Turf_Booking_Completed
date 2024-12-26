package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.turfowner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface turfownerRepo extends JpaRepository<turfowner,Integer> {
    turfowner findByEmail(String email);
}
