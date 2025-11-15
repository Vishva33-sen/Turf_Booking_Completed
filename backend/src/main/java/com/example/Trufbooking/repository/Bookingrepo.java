package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface Bookingrepo extends JpaRepository<Booking, Integer> {

    List<Booking> findByEmail(String email);

    @Query("SELECT b, a.turfname FROM Booking b JOIN admintable a ON b.turfid = a.turfid WHERE a.admin.admin_id = :adminId")
    List<Object[]> getBookingDetailsWithTurfName(@Param("adminId") int adminId);

//    @Query("SELECT b FROM Booking b WHERE booking_id = : bookingId")
//    Booking findByBookingId(@Param("bookingId") int bookingId);

    //List<Booking> findAllById(int bookingId);
}

