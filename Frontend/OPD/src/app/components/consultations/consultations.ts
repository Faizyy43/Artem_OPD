import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultations.html',
  styleUrl: './consultations.css'
})
export class ConsultationsComponent implements OnInit {
  todayAppointments: any[] = [];
  selectedPatientConsultations: any[] = [];
  patients: any[] = [];
  
  newConsultation = {
    appointmentId: null,
    vitals1: '',
    vitals2: '',
    notes: ''
  };

  searchPatientId: number | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadPatients();
  }

  loadAppointments() {
    this.api.getTodayAppointments().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.todayAppointments = data.filter(a => a.status === 'SCHEDULED');
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
    if(!this.newConsultation.appointmentId || !this.newConsultation.vitals1 || !this.newConsultation.vitals2) return;
    
    this.api.addConsultation(this.newConsultation).subscribe({
      next: () => {
        this.loadAppointments();
        this.newConsultation = { appointmentId: null, vitals1: '', vitals2: '', notes: '' };
        if (this.searchPatientId) {
          this.loadPatientConsultations();
        }
      },
      error: (err) => console.error('Error adding consultation', err)
    });
  }

  loadPatientConsultations() {
    if(!this.searchPatientId) return;
    this.api.getPatientConsultations(this.searchPatientId).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.selectedPatientConsultations = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error('Error fetching consultations', err)
    });
  }
}
