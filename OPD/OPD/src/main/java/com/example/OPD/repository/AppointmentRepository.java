package com.example.OPD.repository;

import com.example.OPD.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByAppointmentDateBetween(LocalDateTime start, LocalDateTime end);
}
