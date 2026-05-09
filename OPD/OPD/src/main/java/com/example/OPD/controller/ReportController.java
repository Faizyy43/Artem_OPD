package com.example.OPD.controller;

import com.example.OPD.repository.AppointmentRepository;
import com.example.OPD.repository.ConsultationRepository;
import com.example.OPD.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin("*")
public class ReportController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummaryReport() {
        Map<String, Object> report = new HashMap<>();
        
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        long totalPatients = patientRepository.count();
        long todayAppointments = appointmentRepository.findByAppointmentDateBetween(startOfDay, endOfDay).size();
        long totalConsultations = consultationRepository.count();

        report.put("totalPatients", totalPatients);
        report.put("todayAppointments", todayAppointments);
        report.put("totalConsultationsCompleted", totalConsultations);

        return report;
    }
}
