import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarLaborantinComponent } from '../../components/side-bar-laborantin/side-bar-laborantin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Activity, TableauinfermierComponent } from '../../components/tableauinfermier/tableauinfermier.component';
import { SideBarInfermierComponent } from '../../components/side-bar-infermier/side-bar-infermier.component';

@Component({
  selector: 'app-infermier',
  imports: [CommonModule,SideBarInfermierComponent,FormsModule,TableauinfermierComponent],
  templateUrl: './infermier.component.html',
  styleUrl: './infermier.component.css'
})
export class InfermierComponent {

  /**************************************************SIDEBARRRRRR************************************* */
  
  modalDialog: any;
 
  activityId : string = ''

    isSidebarOpen :boolean=false;
    
  
    toggleSidebar(isExpanded:boolean) {
      this.isSidebarOpen = !isExpanded;
    }
  
  
    laboname: string = 'Said'
    selectedMenu = 'Examens';
   
  
    constructor(private router: Router) {} 
  
    activeItem: string = 'Activités';
    onMenuSelect(menu: string) {
      this.selectedMenu = menu;
      this.activeItem = menu;
      console.log(`Menu sélectionné : ${menu}`);
  
      // Navigation logique en fonction du menu sélectionné
      
      switch (menu) {
        
        case 'Activités':
          this.router.navigate(['infermier']);
          break;
        
        default:
          console.warn('Menu inconnu');
      }
     }

     /*******************************************TABLEAUUUUUUUUUUUUUUUUUUU*********** */
        tableau: Activity[] = [
      {
        examenID: 1,
        consultation: "Consultation générale",
        patient: "Mohamed Ali",
        patient_id: "P12345",
        type: "Général",
        etat: "Terminé",
        priorite: "Haute",
        doctor_details: "Dr. Amine Boukhalfa",
        createdAt: "2025-01-01T09:00:00",
        nss: "1234567890",
      },
      {
        examenID: 2,
        consultation: "Radiologie",
        patient: "Fatima Zahra",
        patient_id: "P67890",
        type: "Imagerie",
        etat: "planifié",
        priorite: "Moyenne",
        doctor_details: "Dr. Sarah Belkacem",
        createdAt: "2025-01-01T11:30:00",
        nss: "0987654321",
      },
      {
        examenID: 3,
        consultation: "Analyse sanguine",
        patient: "Khaled Bensaid",
        patient_id: "P11223",
        type: "Laboratoire",
        etat: "En cours",
        priorite: "Basse",
        doctor_details: "Dr. Lamine Haddad",
        createdAt: "2025-01-02T08:45:00",
        nss: "1122334455",
      },
      {
        examenID: 4,
        consultation: "Échographie",
        patient: "Nora Ait Kaci",
        patient_id: "P44556",
        type: "Imagerie",
        etat: "Terminé",
        priorite: "Haute",
        doctor_details: "Dr. Nadia Amrouche",
        createdAt: "2025-01-02T14:20:00",
        nss: "5566778899",
      },
      {
        examenID: 5,
        consultation: "Consultation dermatologique",
        patient: "Samir Meddah",
        patient_id: "P77889",
        type: "Spécialiste",
        etat: "planifié",
        priorite: "Moyenne",
        doctor_details: "Dr. Rachid Ziane",
        createdAt: "2025-01-03T10:15:00",
        nss: "6677889900",
      },
    ];





      /***************************Recherche********************** */

            // Liste filtrée pour affichage
  filteredExams = [...this.tableau];

  // Méthode de recherche
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim(); // Supprime les espaces inutiles
    this.filteredExams = this.tableau.filter((exam) =>
      exam.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.createdAt.includes(searchTerm)
    );
  }
  resetSearch() {
    this.filteredExams = [...this.tableau];
  }
  
  /*********************************************Voir Details************************ */
  goToDetails(examId: number) {
    this.router.navigate([`infermier/${examId}/activitydetails/${this.activityId}`]);
  }   
}
