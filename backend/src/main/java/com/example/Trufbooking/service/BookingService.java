package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.Booking;
import com.example.Trufbooking.entity.turfowner;
import com.example.Trufbooking.repository.Bookingrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class BookingService {
    private final Bookingrepo bookingRepository;


    public BookingService(Bookingrepo bookingRepository) {
        this.bookingRepository = bookingRepository;
    }


    public List<Map<String, Object>> getBookingDetails(int adminId) {
        List<Object[]> result = bookingRepository.getBookingDetailsWithTurfName(adminId);
        List<Map<String, Object>> bookingDetails = new ArrayList<>();

        for (Object[] row : result) {
            Booking booking = (Booking) row[0];
            String turfname = (String) row[1];

            Map<String, Object> detail = new HashMap<>();
            detail.put("bookingId", booking.getBooking_id());
            detail.put("date", booking.getDate());
            detail.put("email", booking.getEmail());
            detail.put("payedAmt", booking.getPayed_amt());
            detail.put("time", booking.getTime());
            detail.put("turfname", turfname);

            bookingDetails.add(detail);
        }

        return bookingDetails;
    }


}
