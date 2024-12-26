package com.example.Trufbooking.service;


import com.example.Trufbooking.entity.turfowner;
import com.example.Trufbooking.repository.turfownerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class turfownerService {
    @Autowired
    turfownerRepo turfownerrepo;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    public turfowner registerAdmin(turfowner admin) {
        return turfownerrepo.save(admin);
    }


    public boolean verifyAdmin(String email, String password) {
        turfowner admin = turfownerrepo.findByEmail(email);
        if (admin != null) {
            System.out.println("Admin found: " + admin.getEmail());
            System.out.println("Encoded password: " + admin.getPassword());
            // Verify the password
            boolean matches = passwordEncoder.matches(password, admin.getPassword());
            System.out.println("Password matches: " + matches);
            return matches;
        }
        System.out.println("Admin not found with email: " + email);
        return false;
    }


}
