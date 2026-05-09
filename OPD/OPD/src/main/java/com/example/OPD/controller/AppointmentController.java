package com.example.OPD.controller;

import com.example.OPD.models.Appointment;
import com.example.OPD.models.Patient;
import com.example.OPD.repository.AppointmentRepository;
import com.example.OPD.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public static class AppointmentRequest {
        public Long patientId;
        public LocalDateTime appointmentDate;
        public String doctorName;
    }

    @PostMapping
    public Appointment bookAppointment(@RequestBody AppointmentRequest request) {
        Patient patient = patientRepository.findById(request.patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setAppointmentDate(request.appointmentDate);
        appointment.setDoctorName(request.doctorName);
        appointment.setStatus("SCHEDULED");
        
        return appointmentRepository.save(appointment);
    }

    @GetMapping("/today")
    public List<Appointment> listTodayAppointments() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        return appointmentRepository.findByAppointmentDateBetween(startOfDay, endOfDay);
    }
}
