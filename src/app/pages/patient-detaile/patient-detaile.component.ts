import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { Rendezvous } from '../../components/tableaurdv/tableaurdv.component';
import { CommonModule } from '@angular/common';
import { MedCardsComponent } from "../../components/med-cards/med-cards.component";
import { SideBarMedecinComponent } from "../../components/side-bar-medecin/side-bar-medecin.component";
import { AuthState } from '../../services/auth/auth.reducer';
import { ConsultationModalComponent } from "../../components/consultation-modal/consultation-modal.component";
import { Consultations, DossierMedicalDetail } from '../../../types';
import { MedecinService } from '../../services/medecin/medecin.service';
import { EditModalComponent } from "../../components/edit-modal/edit-modal.component";

@Component({
  selector: 'app-patient-detaile',
  imports: [CommonModule, SideBarMedecinComponent, ConsultationModalComponent, EditModalComponent],
  templateUrl: './patient-detaile.component.html',
  styleUrl: './patient-detaile.component.css'
})
export class PatientDetaileComponent {
  nss: string | null = null;
  role : string = "" 
  authState : AuthState| null = null ; 
  medName : string | null = "ahmed" ; 
  patientId : string | null = null 
  private medID : string | null = null ; 
  isModalOpen2 = false ; 
  consultation : Consultations |null = null ;
  consultations : Consultations[]  = []
  constructor(private router:Router, private route: ActivatedRoute  , private medServices : MedecinService) {
    const jsonData = localStorage.getItem('authState');
    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        if (this.authState && this.authState.role) {
          this.medName =this.authState?.username
          this.medID = this.authState?.id
          this.role = this.authState.role
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
    this.patientId = this.route.snapshot.paramMap.get('patientID');
    if (this.patientId) {
      this.medServices.getDossierMedicalDetail("nss" , this.patientId).subscribe((results : DossierMedicalDetail)=>{this.consultations = results.consultations })
    }
    
  }



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

    toggleModalOpen(cons : Consultations) : void {
      this.isModalOpen2 = !this.isModalOpen2
      this.consultation = cons
    }
    goToAddConsultation() : void {
      this.router.navigate([`/medecin/${this.medID}/patients/addConsultation/${this.patientId}`])
    }

    isEditModalOpen = false;
  selectedConsultation: any;

  openEditModal(consultation: any) {
    this.selectedConsultation = consultation;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedConsultation = null;
  }

}
