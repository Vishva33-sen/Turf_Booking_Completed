package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.turfDto;
import com.example.Trufbooking.entity.turfowner;
import com.example.Trufbooking.repository.admintable_repo;
import com.example.Trufbooking.repository.turfownerRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class adminservice {

    @Autowired
    admintable_repo adminrepo;

    @Autowired
    turfownerRepo turforepo;
    @Autowired
    private com.example.Trufbooking.repository.slotrepo slotrepo;

    public List<String> getDistinctLocations() {
        return adminrepo.findDistinctLocations();
    }

    public List<String> getDistinctSports() {
        return adminrepo.findDistinctSports();
    }

    public List<admintable> findTurfsByLocationAndSport(String location, String sport) {
        return adminrepo.findByLocationAndSport(location, sport);
    }

    public admintable findTurfById(Integer turfId) {
        return adminrepo.findById(turfId).orElse(null); // Or throw a custom exception if not found
    }

    public boolean addTurf(admintable turfDetails) {
        try {
            adminrepo.save(turfDetails);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<admintable> getTurfsByAdmin(int admin_id) {
        turfowner admin = turforepo.findById(admin_id).orElse(null);
        if (admin != null) {
            return adminrepo.findByAdmin(admin);
        }
        return Collections.emptyList();
    }

    public Optional<admintable> getTurfById(int turfid) {
        return adminrepo.findById(turfid);
    }

    // Update turf details
    public boolean updateTurf(int turfid, admintable updatedTurf) {
        Optional<admintable> existingTurfOpt = adminrepo.findById(turfid);
        if (existingTurfOpt.isPresent()) {
            admintable existingTurf = existingTurfOpt.get();

            // Update the fields
            existingTurf.setTurfname(updatedTurf.getTurfname());
            existingTurf.setLocation(updatedTurf.getLocation());
            existingTurf.setPrice(updatedTurf.getPrice());
            existingTurf.setSports(updatedTurf.getSports());
            existingTurf.setLength(updatedTurf.getLength());
            existingTurf.setBreadth(updatedTurf.getBreadth());
            existingTurf.setImageData(updatedTurf.getImageData());

            // Save the updated turf
            adminrepo.save(existingTurf);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public boolean deleteTurf(int turfid) {
        if (adminrepo.existsById(turfid)) {
            slotrepo.deleteByTurfId(turfid);
            adminrepo.deleteById(turfid);
            return true;
        } else {
            return false;
        }
    }

}
