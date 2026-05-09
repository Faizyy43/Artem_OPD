package com.example.OPD.repository;

import com.example.OPD.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByNameContainingIgnoreCaseOrPhoneNumberContaining(String name, String phoneNumber);
}
