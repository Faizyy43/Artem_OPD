import { Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients';
import { AppointmentsComponent } from './components/appointments/appointments';
import { ConsultationsComponent } from './components/consultations/consultations';

export const routes: Routes = [
  { path: 'patients', component: PatientsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'consultations', component: ConsultationsComponent },
  { path: '', redirectTo: '/patients', pathMatch: 'full' }
];
