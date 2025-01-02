import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { DossierMedicalDetail } from '../../../types';
import { PatientConsultationsComponent } from "../../components/patient-consultations/patient-consultations.component";
Chart.register(ChartDataLabels);
interface Patient {
  photo: String | null ; 
  name: String | null ; 
  phone:String | null ; 
  sms: String | null ; 
  gender: String | null ; 
  location: String | null ; 
  birth : String | null ; 
  age: String | null ; 
  socialSecurity: String | null ; 
  weight: String | null ; 
  height: String | null ; 
  imc: String | null ; 
}
@Component({
  selector: 'app-patient',
  imports: [MatIconModule, CommonModule, FormsModule, PatientConsultationsComponent],
 
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent  {
  patientID : string | null =null
  constructor(private router : Router , private PatientService : PatientService , private route :ActivatedRoute) {
  }
  /*******************************************HEADERR********************************* */

  patient : Patient | null = null
  patientInfo : DossierMedicalDetail | null = null
  isSidebarOpen :boolean=false;
  modalDialog: any;

  ngOnInit() {
    this.patientID = this.route.snapshot.paramMap.get('id');
    if (this.patientID) {
      this.PatientService.getDossierMedicalDetail('', this.patientID).subscribe(response => {
        this.patientInfo = response;
        this.setPatientInfo();
      });
    }
  }

  setPatientInfo() {
    if (this.patientInfo) {
      this.patient = {
        photo:'assets/patientt.svg',
        name: this.patientInfo.patient.nom + ' ' + this.patientInfo.patient.prenom,
        phone: this.patientInfo.patient.telephone,
        sms: this.patientInfo.patient.telephone, // Make sure it's correct
        gender: 'Masculin',
        location: this.patientInfo.patient.adresse,
        birth: this.patientInfo.patient.dateNaissance,
        age: this.patientInfo.patient.dateNaissance,
        socialSecurity: this.patientInfo.patient.NSS,
        weight: "70",
        height:  "175",
        imc: "20"
      };
    }
  }
  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }


  showPhoneNumber: boolean = false;
  PhoneNumber(): void {
    this.showPhoneNumber = !this.showPhoneNumber;
  }
}


