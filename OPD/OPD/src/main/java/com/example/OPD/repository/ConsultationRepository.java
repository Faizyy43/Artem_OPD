package com.example.OPD.repository;

import com.example.OPD.models.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByAppointmentPatientId(Long patientId);
}
