package com.example.Trufbooking.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "slot_detail")
public class slot {
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
