import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Rendezvous, TableaurdvComponent } from '../../components/tableaurdv/tableaurdv.component'
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { AddRdvComponent } from "../../components/add-rdv/add-rdv.component";
@Component({
  selector: 'app-rendezvous',
  imports: [SideBarComponent, CommonModule, TableaurdvComponent, ModaldialogComponent, AddRdvComponent],
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent {
  isSidebarOpen :boolean=false;
 

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }

  /******************************************************************************************** */
    tableau: Rendezvous[] = [
    {
      name: 'Neil Sims',
      statut: 'confirmé',
      date: '2024-12-26',
      heure: '14:00',
      motif: 'Consultation générale',
      phone: '123-456-7890',
      selected: false,
    },
    {
      name: 'Bonnie Green',
      statut: 'annulé',
      date: '2024-12-27',
      heure: '09:30',
      motif: 'Suivi médical',
      phone: '987-654-3210',
      selected: false,
    },
    {
      name: 'Bonnie Green',
      statut: 'En attente',
      date: '2024-12-27',
      heure: '09:30',
      motif: 'Suivi médical',
      phone: '987-654-3210',
      selected: false,
    },
    {
      name: 'Bonnie Green',
      statut: 'En attente',
      date: '2024-12-27',
      heure: '09:30',
      motif: 'Suivi médical',
      phone: '987-654-3210',
      selected: false,
    },
    {
      name: 'Bonnie Green',
      statut: 'En attente',
      date: '2024-12-27',
      heure: '09:30',
      motif: 'Suivi médical',
      phone: '987-654-3210',
      selected: false,
    },
    {
      name: 'Bonnie Green',
      statut: 'En attente',
      date: '2024-12-27',
      heure: '09:30',
      motif: 'Suivi médical',
      phone: '987-654-3210',
      selected: false,
    },
    {
      name: 'Bonnie Green',
      statut: 'En attente',
      date: '2024-12-27',
      heure: '09:30',
      motif: 'Suivi médical',
      phone: '987-654-3210',
      selected: false,
    },
   
  ];

  modifyAppointment(appointment: Rendezvous): void {
    console.log('Modifier le rendez-vous:', appointment);
    // Logique de modification ici
  }

  deleteAppointment(index: number): void {
    this.tableau.splice(index, 1);
    console.log('Rendez-vous supprimé');
  }

  /**************************************************************************** */
  isModalOpen = false;  // L'état de la modale

  openAddRdvModal() {
    this.isModalOpen = true;  // Ouvre le modal
  }

  closeAddRdvModal(isOpen: boolean) {
    this.isModalOpen = isOpen;  // Ferme le modal quand l'événement est émis
  }
  
  addRdv(appointment: Rendezvous) {
    this.tableau.push(appointment);  // Ajoute le rendez-vous à la liste
    console.log('Rendez-vous ajouté:', appointment);
  }
}
