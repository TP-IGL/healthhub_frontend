import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarRadiologueComponent } from '../../components/side-bar-radiologue/side-bar-radiologue.component';
import { CommonModule } from '@angular/common';
import { Examen, TableauexamComponent } from '../../components/tableauexam/tableauexam.component';
import { RadiologueService } from '../../services/radiologue/radiologue.service';
import { RadiologueExamenDetail } from '../../../types';
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
    
      constructor(private router: Router , private route : ActivatedRoute , private radioService:RadiologueService) {}
      id : string | null = "" 
      radiologuename: string = 'Said'
    
      activeItem: string = 'Examens';

      ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.id = this.route.snapshot.paramMap.get("id")
        this.fetchAllExams(1)
      }
      onMenuSelect(menu: string) {
        this.selectedMenu = menu;
        this.activeItem = menu;
    
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

          /***************************Recherche********************** */


  // Méthode de recherche
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim(); // Supprime les espaces inutiles
    this.filteredExams = this.exams.filter((exam) =>
      exam.patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examen.createdAt.includes(searchTerm)
    );
  }
  resetSearch() {
    this.filteredExams = [...this.exams];
  }
  
  /*********************************************Voir Details************************ */
  goToDetails(examId: string) {
    this.router.navigate([`radiologue/${this.id}/examens/${examId}/examensdetails`]);
  }
  exams : RadiologueExamenDetail[]  = []
  filteredExams: RadiologueExamenDetail[] = []

  fetchAllExams(page: number): void {
    this.radioService.getExamenes('' , '' , '' , page).subscribe({
      next: (response) => {
       
        if (response ) {
          this.exams = [...this.exams, ...response];
          if (response[0].next) {
            const nextPage = this.getPageNumberFromUrl(response.next);
            this.fetchAllExams(nextPage);
          } else {
            this.filteredExams = [...this.exams];
            console.log('All exams fetched:', this.exams);
          }
        } else {
          console.log('No exams found or an error occurred.');
        }
      },
      error: (err) => {
        console.error('Error fetching exams:', err);
      }
    });
  }

  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }
}
