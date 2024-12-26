package com.example.Trufbooking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import java.io.Serializable;
import java.sql.Blob;
import java.util.List;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "admintable")
public class admintable implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="turfid", nullable = false)
    private int turfid;

    @Column(name="turfname",nullable = false)
    private String turfname;

    @Column(name="location",nullable = false)
    private String location;

    @Column(name="mobilenumber", nullable = false)
    private long mobilenumber;

    @Column(name="price", nullable = false)
    private double price;

    @Column(columnDefinition = "json")
    private String sports;

    @ManyToOne
    @JoinColumn(name="admin_id",referencedColumnName = "admin_id",nullable = false)
    private turfowner admin;

    @Column(name = "length")
    private double length;

    @Column(name = "breadth")
    private double breadth;

    @Lob
    @Column(name = "image", nullable = true)
    @JsonIgnore
    private Blob image;

    @Transient
    private byte[] imageData;

    public byte[] getImageData() {
        if (image != null) {
            try {
                return image.getBytes(1, (int) image.length());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public void setImageData(byte[] imageData) {
        if (imageData != null) {
            try {
                this.image = new javax.sql.rowset.serial.SerialBlob(imageData);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }



}
