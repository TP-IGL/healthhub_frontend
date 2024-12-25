import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ModaldialogComponent } from "../modaldialog/modaldialog.component";
export interface Rendezvous {
  name: string;
  statut: string;
  date: string;
  heure: string;
  motif: string;
  phone: string;
  selected : boolean;
}


@Component({
  selector: 'app-tableaurdv',
  imports: [CommonModule, FormsModule, ModaldialogComponent],
  templateUrl: './tableaurdv.component.html',
  styleUrl: './tableaurdv.component.css'
})
export class TableaurdvComponent {
  @Input() tableau: Rendezvous[] = [];
  @Output() modifyEvent = new EventEmitter<Rendezvous>();
  @Output() deleteEvent = new EventEmitter<number>();

  modifyAppointment(tableau: Rendezvous): void {
    this.modifyEvent.emit(tableau);
  }

  deleteAppointment(index: number): void {
    this.deleteEvent.emit(index);
  }
  
  currentPage: number = 1;
  itemsPerPage: number = 15;

  // Retourne le nombre total de pages en fonction du nombre de rendez-vous
  totalPages(): number {
    return Math.ceil(this.tableau.length / this.itemsPerPage);
  }

  // Retourne les rendez-vous de la page actuelle
  paginatedAppointments(): Rendezvous[] {
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

  // Fonction pour cocher/décocher tous les rendez-vous
  toggleAllSelection(event: any): void {
    const isChecked = event.target.checked;
    this.tableau.forEach(appointment => appointment.selected = isChecked);
  }
  hasSelectedAppointments(): boolean {
    return this.tableau.some(appointment => appointment.selected);
  }
  // Supprime les rendez-vous sélectionnés
  deleteSelectedAppointments(): void {
    this.tableau = this.tableau.filter(appointment => !appointment.selected);
    this.currentPage = 1
  }


  /***************************************************POP-UP WINDOW************************************ */

   // Propriétés pour le modal
  modalMessage: string = '';
  isBulkDelete: boolean = false; // Indique si on supprime plusieurs rendez-vous
  appointmentToDeleteIndex: number | null = null; // Index du rendez-vous à supprimer

  // Méthode pour ouvrir le modal
  openModal(message: string, isBulk: boolean, index?: number): void {
    this.modalMessage = message;
    this.isBulkDelete = isBulk;
    if (!isBulk && index !== undefined) {
      this.appointmentToDeleteIndex = index;
    }
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.remove('hidden');
     
    }
  }

  // Méthode pour fermer le modal
  closeModal(): void {
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.add('hidden');
      
    }
    this.isBulkDelete = false;
    this.appointmentToDeleteIndex = null;
  }

  // Méthode pour confirmer la suppression
  confirmDelete(confirmed: boolean): void {
    if (confirmed) {
      if (this.isBulkDelete) {
        this.tableau = this.tableau.filter((appointment) => !appointment.selected);
        this.currentPage = 1
      } else if (this.appointmentToDeleteIndex !== null) {
        this.tableau.splice(this.appointmentToDeleteIndex, 1);
      }
    }
    this.closeModal();
  }

 
}
