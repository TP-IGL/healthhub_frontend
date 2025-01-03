import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarRadiologueComponent } from '../../components/side-bar-radiologue/side-bar-radiologue.component';
import { CommonModule } from '@angular/common';
import { TableauexamComponent } from '../../components/tableauexam/tableauexam.component';
import { FormsModule } from '@angular/forms';
import { LabService } from '../../services/labs/lab.service';
import { Examens, RadiologueExamenDetail } from '../../../types';
import { RadiologueService } from '../../services/radiologue/radiologue.service';
interface ResultatRadio {
  type: string;
  rapport: string;
  radioImgURL  :string 
}
@Component({
  selector: 'app-examen-details',
  imports: [SideBarRadiologueComponent, CommonModule,FormsModule],
  templateUrl: './examen-details.component.html',
  styleUrls: ['./examen-details.component.css']
})
export class ExamenDetailsComponent implements OnInit {

  /***************************************SIDEBAR************************************** */
  isSidebarOpen: boolean = false;
description: any;

  toggleSidebar(isExpanded: boolean) {
    this.isSidebarOpen = !isExpanded;
  }

  selectedMenu = 'Examens'; // État pour suivre le menu actif
  radiologuename: string = 'Said';
  activeItem: string = 'Examens';
  Examens : Examens | null = null ; 
  // Constructor combiné
  constructor(private router: Router, private route: ActivatedRoute , private radioService : RadiologueService) {}

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
        this.router.navigate([`radiologue/examens/${this.examId}/examensdetails`]);
        break;

      default:
        console.warn('Menu inconnu');
    }
  }

  /****************************************** EXAMEN DETAILS ************************** */
  resultat: string = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  imageList: string[] = [];
  selectedDescription: string | null = null;
  examId : string | null = ''
  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('ExamenId');
    console.log('exam' , this.examId)
    this.fetchAllExams(1)
    // t3eyet l  un service pour récupérer l'examen bel l'ID
    
  }

  

  displayImage(image: string | null) {
    if (image) {
      this.imagePreview = image; // Affiche l'image dans une prévisualisation.
    } else {
      console.warn('Aucune image associée à ce résultat.');
    }
  }

  exams : RadiologueExamenDetail[] = []
  filteredExam : RadiologueExamenDetail[] = []
  fetchAllExams(page: number): void {
    this.radioService.getExamenes('' , '' , '' , page).subscribe({
      next: (response) => {
       
        if (response ) {
          this.exams = [...this.exams, ...response];
          if (response[0].next) {
            const nextPage = this.getPageNumberFromUrl(response.next);
            this.fetchAllExams(nextPage);
          } else {
            this.filteredExam =this.exams.filter((result)=>{
              return result.examen.examenID == this.examId
            });
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

  typeOptions: string[] = ['radiographie', 'echographie', 'scanner', 'irm'];
  results: ResultatRadio[] = [];
  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string; 
        this.imagePreview = base64String;

      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: any): void {
    if (form.valid && this.imagePreview && this.examId) {
      // Create the ResultatRadio object
      const formData: ResultatRadio = {
        type: form.value.type,
        rapport: form.value.rapport,
        radioImgURL: this.imagePreview,
      };
  
      this.radioService.createRadiologyResult(this.examId , formData.radioImgURL , formData.type , formData.rapport).subscribe({
        next : (response)=>{
          alert("Results submited with sucess")
        },
        error : (eror)=>{
          alert("try agin please")
        }
      })
  
    }
  }

  resetForm(form: any): void {
    form.reset();
    this.imagePreview = null; // Reset image preview
  }
  
}
