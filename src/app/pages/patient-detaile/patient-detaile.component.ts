import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { Rendezvous } from '../../components/tableaurdv/tableaurdv.component';
import { CommonModule } from '@angular/common';
import { MedCardsComponent } from "../../components/med-cards/med-cards.component";
import { SideBarMedecinComponent } from "../../components/side-bar-medecin/side-bar-medecin.component";
import { AuthState } from '../../services/auth/auth.reducer';
import { ConsultationModalComponent } from "../../components/consultation-modal/consultation-modal.component";
import { Consultations } from '../../../types';

@Component({
  selector: 'app-patient-detaile',
  imports: [CommonModule, MedCardsComponent, SideBarMedecinComponent, ConsultationModalComponent],
  templateUrl: './patient-detaile.component.html',
  styleUrl: './patient-detaile.component.css'
})
export class PatientDetaileComponent {
  nss: string | null = null;

  authState : AuthState| null = null ; 
  medName : string | null = "ahmed" ; 
  private medID : string | null = null ; 
  constructor(private router:Router ) {
    const jsonData = localStorage.getItem('authState');

    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        if (this.authState) {
          this.medName =this.authState?.username
          this.medID = this.authState?.id
        }
        
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }
  isAscending = true;
  page: number = 1; 
  isModalOpen:boolean = false;
  itemsPerPage: number = 3; 
  currentPage: number = 1;
  isSidebarOpen  : boolean = false 
  ngOnInit(): void {
    // Retrieve the 'nss' parameter from the route
  }

    // Example static data for consultations
    consultations = [
      {
        date: '2024-12-25T10:30:00Z',
        medicine: 'Paracetamol 500mg',
        nss: '1234567890',
        status: 'Completed'
      },
      {
        date: '2024-12-26T14:00:00Z',
        medicine: 'Ibuprofen 200mg',
        nss: '0987654321',
        status: 'Pending'
      },
      {
        date: '2024-12-27T16:45:00Z',
        medicine: 'Amoxicillin 250mg',
        nss: '1122334455',
        status: 'Cancelled'
      }
    ];

    get totalPages(): number {
      return Math.ceil(this.consultations.length / this.itemsPerPage);
    }
    

  
    getUser() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.consultations.slice(start, end);
    }
  
    // Pagination logic
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
    toggleSidebar(isExpanded:boolean) {
      this.isSidebarOpen = !isExpanded;
    }
    toggleModal(): void {
      this.isModalOpen = !this.isModalOpen;
    }

    selectedMenu = 'Patients'; // État pour suivre le menu actif
  
    

    activeItem: string = 'Patients';
    onMenuSelect(menu: string) {
      this.selectedMenu = menu;
      this.activeItem = menu;
      console.log(`Menu sélectionné : ${menu}`);
  
      // Navigation logique en fonction du menu sélectionné
      
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
          console.warn('Menu inconnu');
      }
    }
    isModalOpen2 = false ; 
    consultation : Consultations |null = null ;
    toggleModalOpen(cons : Consultations) {
      this.isModalOpen2 = !this.isModalOpen2
      this.consultation = cons
      console.log(this.isModalOpen2)
    }
}
