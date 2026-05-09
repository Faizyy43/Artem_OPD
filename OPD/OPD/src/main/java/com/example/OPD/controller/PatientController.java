package com.example.OPD.controller;

import com.example.OPD.models.Patient;
import com.example.OPD.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @GetMapping
    public List<Patient> listPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/search")
    public List<Patient> searchPatients(@RequestParam(required = false) String name, 
                                        @RequestParam(required = false) String phone) {
        String searchName = name != null ? name : "";
        String searchPhone = phone != null ? phone : "";
        return patientRepository.findByNameContainingIgnoreCaseOrPhoneNumberContaining(searchName, searchPhone);
    }
}
