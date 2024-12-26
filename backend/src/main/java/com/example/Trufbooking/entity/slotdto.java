package com.example.Trufbooking.entity;

import java.util.List;

public class slotdto {
    private Integer turfid;
    private String date;
    private List<String> availableTimes;
//    private String date;
//    private String availableTimes;


    public slotdto(String date, List<String> availableTimes) {
        this.date = date;
        this.availableTimes = availableTimes;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<String> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List<String> availableTimes) {
        this.availableTimes = availableTimes;
    }

    @Override
    public String toString() {
        return "slotdto{" +
                "turfid=" + turfid +
                ", date='" + date + '\'' +
                ", availableTimes=" + availableTimes +
                '}';
    }
}