package com.example.Trufbooking.entity;

public class userdto {
    private String username;
    private String email;
    private long mobile_number;

    public userdto(String username, String email, long mobile_number) {
        this.username = username;
        this.email = email;
        this.mobile_number = mobile_number;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getMobile_number() {
        return mobile_number;
    }

    public void setMobile_number(long mobileNumber) {
        this.mobile_number = mobileNumber;
    }
}