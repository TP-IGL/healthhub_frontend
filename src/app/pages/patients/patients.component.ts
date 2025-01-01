import { Component  , SimpleChange, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MedCardsComponent } from '../../components/med-cards/med-cards.component';
import { PatientsTableComponent } from "../../components/patients-table/patients-table.component";
import { AddPatientModalComponent } from "../../components/add-patient-modal/add-patient-modal.component";
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';
import { MedecinService } from '../../services/medecin/medecin.service';
import { AuthState } from '../../services/auth/auth.reducer';
import { Patients, PatientsListResponse, UsersByDoctor } from '../../../types';
@Component({
  selector: 'app-patients',
  imports: [CommonModule, SideBarMedecinComponent, MedCardsComponent, PatientsTableComponent, AddPatientModalComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  
  isModalOpen:boolean = false;
  authState : AuthState | null = null ; 
  medName : string | null = "ahmed" ; 
  private medID : string | null = null ; 
  constructor(private router: Router ,private medService : MedecinService) {
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

    results : Patients[] = []
    patients : Patients[] = []
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.fetchAllUsers(1)
    }
    fetchAllUsers(page: number): void {
      if (this.medID) {
        this.medService.listPatients(this.medID , '' , '' , page).subscribe({
          next: (users: UsersByDoctor) => {
            if (users) {
              // Append current page results
              this.results = [...this.results, ...users.results];
              // If there is a next page, recursively fetch the next page
              if (users.next) {
                const nextPage = this.getPageNumberFromUrl(users.next);
                this.fetchAllUsers(nextPage); // Recursive call to fetch the next page
              } else {
                // All pages are fetched, you can log or do something with the results
                // If needed, filter users by role here
                this.patients = this.results
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
  
    // Helper method to extract the page number from the "next" URL
    getPageNumberFromUrl(url: string): number {
      const match = url.match(/page=(\d+)/);  // Extract the page number from the URL
      return match ? parseInt(match[1], 10) : 1;  // Return the page number or 1 if not found
    }


  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }
   /*******************************************SIDEBARRRRR*********************** */
    isSidebarOpen :boolean=false;
    
  
    toggleSidebar(isExpanded:boolean) {
      this.isSidebarOpen = !isExpanded;
    }
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['isSidebarOpen']) {
        console.log(changes['isSidebarOpen'].currentValue);
      }
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
   

}
