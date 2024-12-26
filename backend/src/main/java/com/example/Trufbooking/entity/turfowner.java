package com.example.Trufbooking.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name="turf_owner")
public class turfowner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id", nullable = false)
    private int admin_id;

    @Column(unique = true,name = "email", nullable = false)
    private String email;


    @Column(unique = true,nullable = false)
    private String username;

    @Column(name="password",nullable = false)
    private String password;
}
