import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AddHospitalComponent } from './pages/add-hospital/add-hospital.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './pages/stats/stats.component';
import { LoginComponent } from './pages/login/login.component';
import { AddUserComponent } from './pages/add-user/add-user.component'; 
import { MedecinComponent } from './pages/medecin/medecin.component';
import { RendezvousComponent } from './pages/rendezvous/rendezvous.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { OrdonnancesComponent } from './pages/ordonnances/ordonnances.component';
import { RapportsComponent } from './pages/rapports/rapports.component';
import { PatientComponent } from './pages/patient/patient.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { PatientDetaileComponent } from './pages/patient-detaile/patient-detaile.component';
import { AddConsultationComponent } from './pages/add-consultation/add-consultation.component';
import { RadiologueComponent } from './pages/radiologue/radiologue.component';
import { ExamensComponent } from './pages/examens/examens.component';
import { ExamenDetailsComponent } from './pages/examen-details/examen-details.component';
import { LaborantinComponent } from './pages/laborantin/laborantin.component';
import { ExamslabDetailsComponent } from './pages/examslab-details/examslab-details.component';
import { InfermierComponent } from './pages/infermier/infermier.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },

  // Protected routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to protect this route 
    data : {role :'admin'} , 
    children: [
      {
        path: 'hospital',
        component: HospitalComponent,
      },
      {
        path: 'addHospital',
        component: AddHospitalComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
    ],
  },
  {
    path: 'addPatient',
    component: AddPatientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addPerson',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medecin',
    component: MedecinComponent,
    canActivate: [AuthGuard],
    data : {role : 'medcin'}
  },
  {
    path: 'medecin/:id/rendezvous',
    component: RendezvousComponent,
    canActivate: [AuthGuard],
    data : {role : 'medecin'}
  },
  {
    path: 'medecin/:id/patients',
    component: PatientsComponent,
    canActivate: [AuthGuard],
    data : {role : 'medecin'}
  },
  {
    path: 'medecin/:id/ordonnances',
    component: OrdonnancesComponent,
    canActivate: [AuthGuard],
    data : {role : 'medecin'}
  },
  {
    path: 'medecin/:id/rapports',
    component: RapportsComponent,
    canActivate: [AuthGuard],
    data : {role : 'medecin'}
  },
  {
    path: 'medecin/:id/patients/:patientID',
    component: PatientDetaileComponent,
    canActivate: [AuthGuard],
    data : {role : 'medecin'}
  },
  {
    path: 'medecin/:id/patients/addConsultation/:patientID',
    component: AddConsultationComponent,
    canActivate: [AuthGuard],
    data : {role : 'medecin'}
  },
  {
    path: 'patient/:id',
    component: PatientComponent,
    canActivate: [AuthGuard],
    data : {role : 'patient'}
  } , 
  {
    path : 'radiologue/:id' , 
    component : RadiologueComponent ,
    canActivate: [AuthGuard],
    data : {role : 'radiologue'}
  } , 
  {
    path : "radiologue/:id/examens" , component : ExamensComponent , 
    canActivate: [AuthGuard],
    data : {role : 'radiologue'}
  },
  {
    path: 'radiologue/:id/examens/:ExamenId/examensdetails', component: ExamenDetailsComponent ,
    canActivate: [AuthGuard],
    data : {role : 'radiologue'}
 },
 {
  path: 'laborantin/:id', component: LaborantinComponent ,
  canActivate: [AuthGuard],
  data : {role : 'laborantin'}
},
{
  path: 'laborantin/:labid/exams/:id/:nss', component: ExamslabDetailsComponent ,
  canActivate: [AuthGuard],
  data : {role : 'laborantin'}
},
{
  path: 'infermier/:id', component: InfermierComponent,  canActivate: [AuthGuard],
  data : {role : 'infermier'}
},
{
  path: 'infermier/:id/activitydetails/:activityId', component: ActivityDetailsComponent ,canActivate: [AuthGuard],
  data : {role : 'infermier'}
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
