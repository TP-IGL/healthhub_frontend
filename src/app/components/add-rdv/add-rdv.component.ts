import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-add-rdv',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-rdv.component.html',
  styleUrl: './add-rdv.component.css'
})
export class AddRdvComponent {
  @Input() isModalOpen: boolean = false;  // La visibilité du modal est contrôlée par le parent
  @Output() closeModalEvent = new EventEmitter<boolean>()
  @Output() addRdvEvent = new EventEmitter<any>();  // Événement pour ajouter un rendez-vous

  newRdv = {
    name: '',
    statut: 'En attente',
    date: '',
    heure: '',
    motif: '',
    phone: '',
    selected: false
  };
  

  closeModal() {
    this.closeModalEvent.emit(false);  // Lors de la fermeture, on émet false pour informer le parent
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.addRdvEvent.emit(this.newRdv);  // Émet les données du nouveau rendez-vous
    this.closeModal();  // Ferme la modale après soumission
  }
}
