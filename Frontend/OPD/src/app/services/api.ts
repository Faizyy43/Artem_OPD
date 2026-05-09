import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/patients?t=${new Date().getTime()}`);
  }

  searchPatients(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/patients/search?name=${query}&phone=${query}&t=${new Date().getTime()}`);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post(`${API_URL}/patients`, patient);
  }

  // Appointments
  getTodayAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/appointments/today?t=${new Date().getTime()}`);
  }

  bookAppointment(appointment: any): Observable<any> {
    return this.http.post(`${API_URL}/appointments`, appointment);
  }

  // Consultations
  addConsultation(consultation: any): Observable<any> {
    return this.http.post(`${API_URL}/consultations`, consultation);
  }

  getPatientConsultations(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/consultations/patient/${patientId}?t=${new Date().getTime()}`);
  }
}
