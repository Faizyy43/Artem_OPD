import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  patients: any[] = [];
  
  newAppointment = {
    patientId: null,
    appointmentDate: '',
    doctorName: ''
  };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadPatients();
  }

  loadAppointments() {
    this.api.getTodayAppointments().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.appointments = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error('Error fetching appointments', err)
    });
  }

  loadPatients() {
    this.api.getPatients().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.patients = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error('Error fetching patients', err)
    });
  }

  onSubmit() {
    if(!this.newAppointment.patientId || !this.newAppointment.appointmentDate || !this.newAppointment.doctorName) return;
    
    this.api.bookAppointment(this.newAppointment).subscribe({
      next: () => {
        this.loadAppointments();
        this.newAppointment = { patientId: null, appointmentDate: '', doctorName: '' };
      },
      error: (err) => console.error('Error booking appointment', err)
    });
  }
}
