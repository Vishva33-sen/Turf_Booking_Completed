package com.example.Trufbooking.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity

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

    public int getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(int admin_id) {
        this.admin_id = admin_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
