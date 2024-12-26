package com.example.Trufbooking.controller;

import com.example.Trufbooking.entity.Booking;
import com.example.Trufbooking.repository.Bookingrepo;
import com.example.Trufbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private Bookingrepo bookingRepository;

    @PostMapping("/add")
    public String addBooking(@RequestBody Booking booking) {
        bookingRepository.save(booking); // Save the booking object directly
        return "Booking added successfully!";
    }
    @GetMapping("/{email}")
    public List<Booking> getBookingsByEmail(@PathVariable String email) {
        return bookingRepository.findByEmail(email);
    }
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable("bookingId") int booking_id) {
        try {
            // Attempt to delete the booking by its ID
            bookingRepository.deleteById(booking_id);
            return ResponseEntity.ok("Booking successfully deleted");
        } catch (EmptyResultDataAccessException e) {
            // Handle case where booking ID does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking ID not found");
        } catch (Exception e) {
            // Handle generic errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting booking: " + e.getMessage());
        }
    }

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookingdetails")
    public List<Map<String, Object>> getBookingDetails(@RequestParam("adminId") int adminId) {
        return bookingService.getBookingDetails(adminId);
    }







}
