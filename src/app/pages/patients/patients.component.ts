import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Patients, UsersByDoctor } from '../../../types';
import { MedecinService } from '../../services/medecin/medecin.service';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { SideBarMedecinComponent } from "../../components/side-bar-medecin/side-bar-medecin.component";
import { CommonModule } from '@angular/common';
import { MedCardsComponent } from "../../components/med-cards/med-cards.component";
import { PatientsTableComponent } from "../../components/patients-table/patients-table.component";
import { AddPatientModalComponent } from "../../components/add-patient-modal/add-patient-modal.component";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  imports: [ SideBarMedecinComponent, CommonModule, MedCardsComponent, PatientsTableComponent, AddPatientModalComponent]
})
export class PatientsComponent implements OnInit {
  isModalOpen: boolean = false;
  isSidebarOpen: boolean = false;
  codeModal: boolean = false;
  medName: string | null = 'ahmed';
  private medID: string | null = null;
  results: Patients[] = [];
  patients: Patients[] = [];
  activeItem: string = 'Patients';

  constructor(private router: Router, private medService: MedecinService) {
    const jsonData = localStorage.getItem('authState');
    if (jsonData) {
      try {
        const authState = JSON.parse(jsonData);
        this.medName = authState?.username;
        this.medID = authState?.id;
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }

  ngOnInit(): void {
    this.fetchAllUsers(1);
  }

  fetchAllUsers(page: number): void {
    if (this.medID) {
      this.medService.listPatients(this.medID, '', '', page).subscribe({
        next: (users: UsersByDoctor) => {
          if (users) {
            this.results = [...this.results, ...users.results];
            if (users.next) {
              const nextPage = this.getPageNumberFromUrl(users.next);
              this.fetchAllUsers(nextPage);
            } else {
              this.patients = this.results;
            }
          } else {
            console.log('No users found or an error occurred.');
          }
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }
  }

  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  toggleSidebar(isExpanded: boolean): void {
    this.isSidebarOpen = !isExpanded;
  }

  onMenuSelect(menu: string): void {
    this.activeItem = menu;
    switch (menu) {
      case 'Patients':
        this.router.navigate(['medecin/:id/patients']);
        break;
      case 'Rendez-vous':
        this.router.navigate(['medecin/rendezvous']);
        break;
      case 'Ordonnances':
        this.router.navigate(['medecin/ordonnances']);
        break;
      case 'Rapports':
        this.router.navigate(['medecin/rapports']);
        break;
      default:
        console.warn('Unknown menu');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const imageUrl = URL.createObjectURL(file);
  
      const codeReader = new BrowserQRCodeReader();
  
      codeReader.decodeFromImageUrl(imageUrl)
        .then((result) => {
          const nss = result.getText(); // Use getText() to retrieve the QR code content
  
          // Redirect to the patient's page using the decoded NSS
          this.router.navigate([`/medecin/${this.medID}/patients/${nss}`]);
        })
        .catch((err) => {
          console.error('Error decoding QR code from image:', err);
        })
        .finally(() => {
          URL.revokeObjectURL(imageUrl); // Clean up the object URL
        });
    }
  }
  
}
