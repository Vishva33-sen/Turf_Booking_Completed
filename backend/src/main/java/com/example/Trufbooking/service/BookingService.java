package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.Booking;
import com.example.Trufbooking.entity.slot;
import com.example.Trufbooking.entity.turfowner;
import com.example.Trufbooking.repository.Bookingrepo;
import com.example.Trufbooking.repository.slotrepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingService {
    private final Bookingrepo bookingRepository;


    public BookingService(Bookingrepo bookingRepository)
    {
        this.bookingRepository = bookingRepository;
    }
    @Autowired
    private slotrepo slotrepository;

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

    public Map<String,Object> getBooking(int bookingId){
        //List<Booking> bookingDetails = bookingRepository.findAllById(bookingId);
        Booking bookingDetail = bookingRepository.getReferenceById(bookingId);
        System.out.println("Booking Details");
        Optional<Booking> details = bookingRepository.findById(bookingId);
        Map<String,Object> tofrontend = new HashMap<>();
        tofrontend.put("bookingId",details.get().getBooking_id());
        tofrontend.put("turfname",details.get().getTurfName());
        tofrontend.put("email",details.get().getEmail());
        tofrontend.put("payedAmt",details.get().getPayed_amt());
        tofrontend.put("date",details.get().getDate());
        tofrontend.put("time",details.get().getTime());
        tofrontend.put("turfId",details.get().getTurfid());
        return tofrontend;
    }

    private final ObjectMapper objectMapper = new ObjectMapper();
    public void updateTicket(Booking updatedTicket){
        int turf_id = updatedTicket.getTurfid();
        List<String> time = updatedTicket.getTime();
        String date = updatedTicket.getDate();
        Optional<slot> previousSlot = slotrepository.findByTurfId(turf_id);
        List<Map<String,String>> timeSlots = null;
        List<Map<String,Object>> slotsData = null;
        // slot clearance
        if(previousSlot.isPresent()){
            slot outDatedSlot = previousSlot.get();
            System.out.println("Backend Progress "+ outDatedSlot.getTime());
            System.out.println("Need to update "+ updatedTicket.getTime());

            try {
                String timeJSON = outDatedSlot.getTime();
                slotsData = objectMapper.readValue(timeJSON, List.class);
                for(Map<String,Object> dateSlot : slotsData){
                    if(date.equals(dateSlot.get("date"))){
                        timeSlots = (List<Map<String,String>>) dateSlot.get("slots");
                        for(Map<String,String> timeSlot: timeSlots){
                            for(int i=0;i<time.size();i++){
                                if(timeSlot.get("time").equals(time.get(i)) && timeSlot.get("status").equals("booked")){
                                     timeSlot.put("status","available");
                                    String updatedTimeJSON = objectMapper.writeValueAsString(slotsData);
                                    outDatedSlot.setTime(updatedTimeJSON);
                                    slotrepository.save(outDatedSlot);
                                }
                            }
                        }
                    }
                }
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

        }
        // Update in user table
        Optional<Booking> updatebooking = bookingRepository.findById(updatedTicket.getBooking_id());
        if(updatebooking.isPresent()){
            Booking updatedVersion = updatebooking.get();
            List<String>updatedTime = updatedVersion.getTime();
            for(int i=0;i<updatedTime.size();i++){
                for(int j=0;j<time.size();j++){
                    if (updatedTime.get(i).equals(time.get(j))){
                        updatedTime.remove(i);
                    }
                }
            }
            updatedVersion.setTime(updatedTime);
            bookingRepository.save(updatedVersion);
        }
    }

}
