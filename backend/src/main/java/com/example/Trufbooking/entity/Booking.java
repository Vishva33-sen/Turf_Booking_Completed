package com.example.Trufbooking.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;
import java.util.List;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "Booking_table")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booking_id", nullable = false)
    private int booking_id;

    @Column(name = "email", nullable = false)
    private String email;

    public Booking(String email, int turfid,  double payed_amt, String date, List<String> time) {
        this.email = email;
        this.turfid = turfid;

        this.payed_amt = payed_amt;
        this.date = date;
        this.time = time;
    }
    public Booking() {

    }
    public int getTurfid() {
        return turfid;
    }

    public void setTurfid(int turfid) {
        this.turfid = turfid;
    }

    public List<String> getTime() {
        return time;
    }

    public void setTime(List<String> time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPayed_amt() {
        return payed_amt;
    }

    public void setPayed_amt(double payed_amt) {
        this.payed_amt = payed_amt;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(int booking_id) {
        this.booking_id = booking_id;
    }

    @Column(name="turfid", nullable = false)
    private int turfid;

    @Column(name="payed_amt", nullable = false)
    private double payed_amt;

    @Column(name = "date",nullable = false)

    private String date;

    @Column(name = "time",columnDefinition = "json",nullable = false)
    @Convert(converter = JsonConverter.class)
    private List<String> time;
}
