package com.example.OPD.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    private String vitals1;
    private String vitals2;
    private String notes;
}
