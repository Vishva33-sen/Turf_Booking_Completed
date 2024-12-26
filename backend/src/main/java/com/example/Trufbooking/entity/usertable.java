package com.example.Trufbooking.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;

@NamedQuery(name = "usertable.findByEmailId", query = "Select u from usertable u where u.email=:email")

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name="usertable")
public class usertable implements Serializable {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "mobile number")
    private long mobile_number;

    @Column(name = "password", nullable = false)
    private String password;

    public String toString() {
        return "usertable{" +
                "email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", mobile_number=" + mobile_number +
                ", password='" + password + '\'' +
                '}';
    }


}
