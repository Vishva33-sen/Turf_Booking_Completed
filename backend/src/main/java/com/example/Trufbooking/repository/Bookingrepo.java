package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface Bookingrepo extends JpaRepository<Booking, Integer> {
    List<Booking> findByEmail(String email);

    @Query("SELECT b, a.turfname FROM Booking b JOIN admintable a ON b.turfid = a.turfid")
    List<Object[]> getBookingDetailsWithTurfName();
}

