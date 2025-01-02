import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ModaldialogComponent } from "../modaldialog/modaldialog.component";
import { ExamRequired } from '../../../types';
import { Router } from '@angular/router';


export interface HealthMetric {
  id: number;
  metric_type: string;
  value: string;
  unit: string;
  measured_at: string;
}

export interface Examen {
  examenID: number;
  consultation: string;
  patient: string;
  patient_id: string;
  type: string;
  etat: string;
  priorite: string;
  doctor_details: string;
  createdAt: string;
  health_metrics: HealthMetric[];
  nss: string;
}

@Component({
  selector: 'app-tableau-lab',
  imports: [CommonModule, FormsModule],
  templateUrl: './tableau-lab.component.html',
  styleUrl: './tableau-lab.component.css'
})
export class TableauLabComponent {
  constructor(private route: Router) {

  }
  @Input() tableau: ExamRequired[] | null = [];
  @Output() detailsRequested = new EventEmitter<number>()
  @Input() lab_id : string | null= null


     onDetailsClick(id: string | null , nss : string | null) {
      this.route.navigate([`laborantin/${this.lab_id}/exams/${id}/${nss}`])
    }
    
      
      currentPage: number = 1;
      itemsPerPage: number = 15;
    
      // Retourne le nombre total de pages en fonction du nombre de rendez-vous
      totalPages(): number {
        if (this.tableau) {
          return Math.ceil(this.tableau.length / this.itemsPerPage);
        }else {
          return 0
        }

      }
    
      // Retourne les rendez-vous de la page actuelle
      paginatedAppointments(): ExamRequired[]  {
        if (this.tableau) {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.tableau?.slice(startIndex, endIndex);
        }else {
          return []
        }

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
