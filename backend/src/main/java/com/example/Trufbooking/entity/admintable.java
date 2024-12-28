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

    public int getTurfid() {
        return turfid;
    }

    public void setTurfid(int turfid) {
        this.turfid = turfid;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public double getBreadth() {
        return breadth;
    }

    public void setBreadth(double breadth) {
        this.breadth = breadth;
    }

    public String getTurfname() {
        return turfname;
    }

    public void setTurfname(String turfname) {
        this.turfname = turfname;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public long getMobilenumber() {
        return mobilenumber;
    }

    public void setMobilenumber(long mobilenumber) {
        this.mobilenumber = mobilenumber;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSports() {
        return sports;
    }

    public void setSports(String sports) {
        this.sports = sports;
    }

    public turfowner getAdmin() {
        return admin;
    }

    public void setAdmin(turfowner admin) {
        this.admin = admin;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }
}
