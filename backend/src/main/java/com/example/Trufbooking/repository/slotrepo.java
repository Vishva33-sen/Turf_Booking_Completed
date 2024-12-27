package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.slot;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface slotrepo extends JpaRepository<slot, Integer> {

    @Query(value = "SELECT " +
            "    turfid, " +
            "    jt.date, " +
            "    GROUP_CONCAT(DISTINCT slot.time ORDER BY slot.time) AS available_times " +
            "FROM " +
            "    slot_detail, " +
            "    JSON_TABLE(time, '$[*]' COLUMNS (" +
            "        date VARCHAR(10) PATH '$.date', " +
            "        slots JSON PATH '$.slots'" +
            "    )) AS jt, " +
            "    JSON_TABLE(jt.slots, '$[*]' COLUMNS (" +
            "        time VARCHAR(11) PATH '$.time', " +
            "        status VARCHAR(10) PATH '$.status'" +
            "    )) AS slot " +
            "WHERE " +
            "    turfid = :turfId " +
            "    AND slot.status = 'available' " +
            "GROUP BY " +
            "    turfid, jt.date", nativeQuery = true)
    List<Object[]> findAvailableSlotsByTurfId(Integer turfId);


    @Modifying
    @Transactional
    @Query(value = "UPDATE slot_detail t " +
            "SET t.time = JSON_SET(t.time, " +
            "   '$[0].date', :today , " +
            "   '$[1].date', :tomorrow , " +
            "   '$[2].date', :dayAfterTomorrow ) " +
            "WHERE JSON_CONTAINS(t.time, JSON_OBJECT('date', :today), '$')", nativeQuery = true)
    void executeCustomUpdate(@Param("today") String today,
                             @Param("tomorrow") String tomorrow,
                             @Param("dayAfterTomorrow") String dayAfterTomorrow);


    @Query("SELECT s FROM slot s WHERE s.turf.turfid = :turfid")
    Optional<slot> findByTurfId(int turfid);

    @Modifying
    @Transactional
    @Query("DELETE FROM slot s WHERE s.turf.turfid = :turfid")
    void deleteByTurfId(@Param("turfid") int turfid);


}