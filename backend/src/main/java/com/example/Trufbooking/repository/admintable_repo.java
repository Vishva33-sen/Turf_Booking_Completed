package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.turfDto;
import com.example.Trufbooking.entity.turfowner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface admintable_repo extends JpaRepository<admintable, Integer> {
    @Query("select distinct a1.location from admintable a1")
    List<String> findDistinctLocations();

    @Query(value = "SELECT DISTINCT JSON_UNQUOTE(JSON_EXTRACT(sports, CONCAT('$[', n.n, ']'))) AS sport " +
            "FROM admintable a " +
            "CROSS JOIN (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) n " +
            "WHERE JSON_UNQUOTE(JSON_EXTRACT(sports, CONCAT('$[', n.n, ']'))) IS NOT NULL", nativeQuery = true)
    List<String> findDistinctSports();

    @Query("SELECT a FROM admintable a WHERE :sport IN (SELECT JSON_UNQUOTE(JSON_EXTRACT(a.sports, CONCAT('$[', n.n, ']'))) FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) n) AND a.location = :location")
    List<admintable> findByLocationAndSport(@Param("location") String location, @Param("sport") String sport);

    List<admintable> findByAdmin(turfowner admin);

}
