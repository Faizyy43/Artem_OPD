import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  searchQuery: string = '';
  
  newPatient = {
    name: '',
    gender: 'Male',
    age: null,
    phoneNumber: ''
  };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPatients();
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
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.loadPatients();
      return;
    }
    
    this.api.searchPatients(this.searchQuery.trim()).subscribe({
      next: (data) => {
        this.patients = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error searching patients', err)
    });
  }

  onSubmit() {
    if(!this.newPatient.name || !this.newPatient.age || !this.newPatient.phoneNumber) return;
    
    this.api.addPatient(this.newPatient).subscribe({
      next: () => {
        this.loadPatients();
        this.newPatient = { name: '', gender: 'Male', age: null, phoneNumber: '' };
      },
      error: (err) => console.error('Error adding patient', err)
    });
  }
}
