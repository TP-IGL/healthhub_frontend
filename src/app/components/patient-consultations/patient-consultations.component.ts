import { Component, Input } from '@angular/core';
import { Consultation, Consultations } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationModalComponent } from "../consultation-modal/consultation-modal.component";
import { CommonModule } from '@angular/common';
import { EditModalComponent } from "../edit-modal/edit-modal.component";

@Component({
  selector: 'app-patient-consultations',
  imports: [ConsultationModalComponent, CommonModule, EditModalComponent],
  templateUrl: './patient-consultations.component.html',
  styleUrl: './patient-consultations.component.css'
})
export class PatientConsultationsComponent {
  consultation : Consultations |null = null ;
  @Input() consultations : Consultations[] | null | undefined = null
  @Input() userRole : "medcine" | "patient" = "medcine"
  constructor(private router:Router, private route: ActivatedRoute) {
  }
  isAscending = true;
  page: number = 1; 
  isModalOpen2:boolean = false;
  itemsPerPage: number = 3; 
  currentPage: number = 1;
  isSidebarOpen  : boolean = false 
 
    get totalPages(): number {
      if (this.consultations) {
        return Math.ceil(this.consultations.length / this.itemsPerPage);
      }else {
        return 0
      }
      
    }
    

  
    getUser() {
      if (this.consultations) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.consultations.slice(start, end);
      }else {
        return []
      }

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
  
    toggleModalOpen(cons : Consultations) : void {
      this.isModalOpen2 = !this.isModalOpen2
      this.consultation = cons
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


