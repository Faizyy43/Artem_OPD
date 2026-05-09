package com.example.OPD.controller;

import com.example.OPD.models.Appointment;
import com.example.OPD.models.Consultation;
import com.example.OPD.repository.AppointmentRepository;
import com.example.OPD.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin("*")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public static class ConsultationRequest {
        public Long appointmentId;
        public String vitals1;
        public String vitals2;
        public String notes;
    }

    @PostMapping
    public Consultation addConsultation(@RequestBody ConsultationRequest request) {
        Appointment appointment = appointmentRepository.findById(request.appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Consultation consultation = new Consultation();
        consultation.setAppointment(appointment);
        consultation.setVitals1(request.vitals1);
        consultation.setVitals2(request.vitals2);
        consultation.setNotes(request.notes);

        // Mark consultation complete
        appointment.setStatus("COMPLETED");
        appointmentRepository.save(appointment);

        return consultationRepository.save(consultation);
    }

    @GetMapping("/patient/{patientId}")
    public List<Consultation> getPatientConsultations(@PathVariable Long patientId) {
        return consultationRepository.findByAppointmentPatientId(patientId);
    }
}
