import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarRadiologueComponent } from '../../components/side-bar-radiologue/side-bar-radiologue.component';
import { CommonModule } from '@angular/common';
import { TableauexamComponent } from '../../components/tableauexam/tableauexam.component';
import { FormsModule } from '@angular/forms';
import { LabService } from '../../services/labs/lab.service';
import { Examens } from '../../../types';
@Component({
  selector: 'app-examen-details',
  imports: [SideBarRadiologueComponent, CommonModule, TableauexamComponent,FormsModule],
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
  constructor(private router: Router, private route: ActivatedRoute , private laboService: LabService) {}

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
        this.router.navigate([`radiologue/examens/${this.exam.id}/examensdetails`]);
        break;

      default:
        console.warn('Menu inconnu');
    }
  }

  /****************************************** EXAMEN DETAILS ************************** */
  exam = {
    id: 1,
    name: 'Test Radiologique',
    date: '2024-12-30',
    Urgence: 'Très Urgent',
    statut: 'En attente',
    consultationAssociee: 'Consultation X',
    resultats: [] as { resultat: string; image: string | null ; description:string}[],
    patient: 'Joe Doe Abdelhamid',
    description: ['Fracture détectée dans le bras droit', 'Anomalie pulmonaire détectée']
  };

  resultat: string = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  imageList: string[] = [];
  selectedDescription: string | null = null;
  examId : string | null = ''
  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id');
    console.log('exam' , this.examId)
    this.selectedDescription = this.exam.description[0]
    // t3eyet l  un service pour récupérer l'examen bel l'ID
    if (this.examId) {
      this.laboService.getExaminationById(this.examId).subscribe((result)=>console.log("exams" , result))
    }
    
  }

  
  saveResult() {
    if (this.resultat.trim() && this.imageFile) {
      // si ya descriptions dispos
      if (this.exam.description.length > this.exam.resultats.length) {
        const descriptionIndex = this.exam.resultats.length; // Utiliser l'index basé sur le nombre de résultats déjà ajoutés
        
        const newResult = {
          resultat: this.resultat,
          image: this.imagePreview,
          description: this.exam.description[descriptionIndex], // Associe la description correspondante
        };
  
        this.exam.resultats.push(newResult); // Ajouter le nouveau résultat
        this.exam.statut = this.exam.resultats.length === this.exam.description.length ? 'Terminé' : 'En cours';
  
        console.log('Résultat sauvegardé:', this.resultat);
        console.log('Description associée:', this.exam.description[descriptionIndex]);
        console.log('Image associée:', this.imageFile.name);
  
        // Réinitialiser les champs
        this.resultat = '';
        this.imageFile = null;
        this.imagePreview = null;
      } else {
        console.warn('Toutes les descriptions disponibles ont déjà été utilisées.');
      }
    } else {
      console.warn('Veuillez remplir tous les champs avant de sauvegarder.');
    }
  }
  
  
  
  

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  displayImage(image: string | null) {
    if (image) {
      this.imagePreview = image; // Affiche l'image dans une prévisualisation.
    } else {
      console.warn('Aucune image associée à ce résultat.');
    }
  }
}
