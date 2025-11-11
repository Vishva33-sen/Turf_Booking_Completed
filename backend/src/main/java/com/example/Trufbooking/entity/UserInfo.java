package com.example.Trufbooking.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;


@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "userinfo")
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserInfo {

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private int age;

    @Lob
    private byte[] image;

    @ElementCollection
    @CollectionTable(
            name = "wish_list",
            joinColumns = @JoinColumn(name = "email")
    )
    //@Convert(converter = JsonListConverter.class)
    @Column(name = "wishlist")
    private List<Integer> wishlist;

    public UserInfo() {
        }

    public String getEmail() {
        return email;
    }

    public void setWishlist(List<Integer> wishlist) {
        this.wishlist = wishlist != null ? wishlist : new ArrayList<>();
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public UserInfo(String email, int age, byte[] image, List<Integer> wishlist) {
        this.email = email;
        this.age = age;
        this.image = image;
        this.wishlist = wishlist;
    }

    public int getAge() {
        return age;
    }

    public byte[] getImage() {
        return image;
    }

    public List<Integer> getWishlist() {
        return wishlist;
    }


}
