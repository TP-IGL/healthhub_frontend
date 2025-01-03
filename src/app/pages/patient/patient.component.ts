import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { DossierMedicalDetail } from '../../../types';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientConsultationsComponent } from "../../components/patient-consultations/patient-consultations.component";
import { Store } from '@ngrx/store';
import { AuthState } from '../../services/auth/auth.reducer';
import { logout } from '../../services/auth/auth.actions';
interface Patient {
  photo: string | null;
  name: string | null;
  phone: string | null;
  sms: string | null;
  gender: string | null;
  location: string | null;
  birth: string | null;
  age: string | null;
  socialSecurity: string | null;
  weight: string | null;
  height: string | null;
  imc: string | null;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'] , 
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PatientConsultationsComponent]
})
export class PatientComponent implements OnInit {
  patientID: string | null = null;
  qrcodeUrl: string = ''; // Holds the QR code image data
  patient: Patient | null = null;
  patientInfo: DossierMedicalDetail | null = null;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute , 
    private store : Store<AuthState> , 
    private router : Router
  ) {}

  ngOnInit() {
    this.patientID = this.route.snapshot.paramMap.get('id');
    if (this.patientID) {
      this.patientService.getDossierMedicalDetail('', this.patientID).subscribe(response => {
        this.patientInfo = response;
        this.setPatientInfo();
      });
    }
  }

  setPatientInfo() {
    if (this.patientInfo) {
      const nssAsNumber = parseInt(this.patientInfo.patient.NSS, 10); // Convert NSS to number
      if (!isNaN(nssAsNumber)) {
        this.generateQRCode(nssAsNumber.toString()); // Generate QR code from numeric NSS
      }

      this.patient = {
        photo: 'assets/patientt.svg',
        name: `${this.patientInfo.patient.nom} ${this.patientInfo.patient.prenom}`,
        phone: this.patientInfo.patient.telephone,
        sms: this.patientInfo.patient.telephone,
        gender: 'Masculin',
        location: this.patientInfo.patient.adresse,
        birth: this.patientInfo.patient.dateNaissance,
        age: this.patientInfo.patient.dateNaissance,
        socialSecurity: this.patientInfo.patient.NSS,
        weight: '70',
        height: '175',
        imc: '20'
      };
    }
  }

  generateQRCode(nss: string) {
    QRCode.toDataURL(nss, { width: 200, margin: 2 }, (err, url) => {
      if (!err) {
        this.qrcodeUrl = url;
      }
    });
  }
  showPhoneNumber: boolean = false;
  PhoneNumber(): void {
    this.showPhoneNumber = !this.showPhoneNumber;
  }
  downloadQRCode() {
    if (this.qrcodeUrl) {
      saveAs(this.qrcodeUrl, 'qrcode.png'); // Download QR code as an image
    }
  }
  logout() {
    this.store.dispatch(logout())
    this.router.navigate(["/"])
  }
}
