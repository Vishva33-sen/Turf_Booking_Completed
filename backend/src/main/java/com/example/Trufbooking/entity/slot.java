package com.example.Trufbooking.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "slot_detail")
public class slot {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public admintable getTurf() {
        return turf;
    }

    public void setTurf(admintable turf) {
        this.turf = turf;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "turfid", referencedColumnName = "turfid")
    private admintable turf;

    @Column(name = "time",nullable = false, columnDefinition = "JSON")
    private String time;

}
