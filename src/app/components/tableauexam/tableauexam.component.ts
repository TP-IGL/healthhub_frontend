import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ModaldialogComponent } from "../modaldialog/modaldialog.component";


export interface Examen {
  id:number;
  name: string;
  patient :string;
  statut: string;
  date: string;
  Urgence:string;
  consultation: string ; 
}


@Component({
  selector: 'app-tableauexam',
  imports: [CommonModule, FormsModule, ModaldialogComponent],
  templateUrl: './tableauexam.component.html',
  styleUrl: './tableauexam.component.css'
})
export class TableauexamComponent {
   @Input() tableau: Examen[] = [];
   @Output() detailsRequested = new EventEmitter<number>()
   onDetailsClick(id: number) {
    this.detailsRequested.emit(id); // Émet l'ID de l'examen
  }
  
    
    currentPage: number = 1;
    itemsPerPage: number = 15;
  
    // Retourne le nombre total de pages en fonction du nombre de rendez-vous
    totalPages(): number {
      return Math.ceil(this.tableau.length / this.itemsPerPage);
    }
  
    // Retourne les rendez-vous de la page actuelle
    paginatedAppointments(): Examen[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.tableau.slice(startIndex, endIndex);
    }
  
    // Allume la pagination vers la page suivante
    nextPage(): void {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
    }
  
    // Allume la pagination vers la page précédente
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    
  
  
   
}
