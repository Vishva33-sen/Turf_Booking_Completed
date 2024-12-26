package com.example.Trufbooking.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "admininfo")
@JsonIgnoreProperties(ignoreUnknown = true)
public class admininfo {
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Id
    @Column(nullable = false, unique = true)
    private String username;

    public admininfo(String username, String email, byte[] image) {
        this.username = username;
        this.email = email;
        this.image = image;
    }
    public admininfo() {}
    @Lob
    private byte[] image;

    @Column(nullable = false, unique = true)
    private String email;


}
