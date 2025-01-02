import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarRadiologueComponent } from '../../components/side-bar-radiologue/side-bar-radiologue.component';
import { CommonModule } from '@angular/common';
import { Examen, TableauexamComponent } from '../../components/tableauexam/tableauexam.component';
@Component({
  selector: 'app-examens',
  imports: [SideBarRadiologueComponent,CommonModule,TableauexamComponent],
  templateUrl: './examens.component.html',
  styleUrl: './examens.component.css'
})
export class ExamensComponent {

  /***************************************SIDEBARRRR************************************** */
  isSidebarOpen :boolean=false;
      
    
      toggleSidebar(isExpanded:boolean) {
        this.isSidebarOpen = !isExpanded;
      }
    
    
    
      selectedMenu = 'Examens'; // État pour suivre le menu actif
    
      constructor(private router: Router) {} 
      radiologuename: string = 'Said'
    
      activeItem: string = 'Examens';
      onMenuSelect(menu: string) {
        this.selectedMenu = menu;
        this.activeItem = menu;
        console.log(`Menu sélectionné : ${menu}`);
    
        // Navigation logique en fonction du menu sélectionné
        
        switch (menu) {
          case 'Acceuil':
            this.router.navigate(['radiologue']);
            break;
          case 'Examens':
            this.router.navigate(['radiologue/examens']);
            break;
          
          default:
            console.warn('Menu inconnu');
        }
       }
       /**********************************************Tableau exams*************************** */

        tableau: Examen[] = [
           {
             id:1,
             name: 'Neil Sims',
             patient : 'Neil Sims',
             statut: 'Terminé',
             date: '2024-12-26',
             Urgence : 'trés urgent',
             consultation:'Consultation 1',
             
           },
           {
             id:2,
             name: '',
             patient : 'Bonnie Green',
             statut: 'annulé',
             date: '2024-12-27',
             Urgence : 'urgent',
             consultation:'',
             
            
           },
           {
             id:3,
             name: '',
             patient : 'Bonnie Green',
             statut: 'En cours',
             date: '2024-12-27',
             Urgence : 'normal',
             consultation:'',
           },
           {
             id:4,
             name: '',
             patient : 'Bonnie Green',
             statut: 'Non traité',
             date: '2024-12-27',
             Urgence : 'trés urgent',
             consultation:'',
           },
          ]
          /***************************Recherche********************** */

            // Liste filtrée pour affichage
  filteredExams = [...this.tableau];

  // Méthode de recherche
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim(); // Supprime les espaces inutiles
    this.filteredExams = this.tableau.filter((exam) =>
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.date.includes(searchTerm)
    );
  }
  resetSearch() {
    this.filteredExams = [...this.tableau];
  }
  
  /*********************************************Voir Details************************ */
  goToDetails(examId: number) {
    this.router.navigate([`radiologue/examens/${examId}/examensdetails`]);
  }
}
