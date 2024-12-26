import { Component  , SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MedCardsComponent } from '../../components/med-cards/med-cards.component';
import { PatientsTableComponent } from "../../components/patients-table/patients-table.component";
import { AddPatientModalComponent } from "../../components/add-patient-modal/add-patient-modal.component";
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';
@Component({
  selector: 'app-patients',
  imports: [CommonModule, SideBarMedecinComponent, MedCardsComponent, PatientsTableComponent, AddPatientModalComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  
  isModalOpen:boolean = false;
  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }
   /*******************************************SIDEBARRRRR*********************** */
    isSidebarOpen :boolean=false;
    
  
    toggleSidebar(isExpanded:boolean) {
      this.isSidebarOpen = !isExpanded;
    }
  
  
  
    selectedMenu = 'Patients'; // État pour suivre le menu actif
  
    constructor(private router: Router) {} // Injection du service Router
    

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
   

}
