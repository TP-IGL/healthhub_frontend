import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Rendezvous, TableaurdvComponent } from '../../components/tableaurdv/tableaurdv.component'
import { AddRdvComponent } from "../../components/add-rdv/add-rdv.component";
import { Router } from '@angular/router';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';
@Component({
  selector: 'app-rendezvous',
  imports: [CommonModule, TableaurdvComponent, AddRdvComponent, SideBarMedecinComponent],
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent {
  

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

 
  /****************************************SIDEBARRRRRRRRRRRRRRR****************************** */
  isSidebarOpen :boolean=false;
  

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }



  selectedMenu = 'Rendez-vous'; // État pour suivre le menu actif

  constructor(private router: Router) {}

  activeItem: string = 'Rendez-vous';
  onMenuSelect(menu: string) {
    this.selectedMenu = menu;
    this.activeItem = menu;
    console.log(`Menu sélectionné : ${menu}`);

    // Navigation logique en fonction du menu sélectionné
    
    switch (menu) {
      case 'Patients':
        this.router.navigate(['medecin/:id/patients']);
        break;
      case 'Rendez-vous':
        this.router.navigate(['medecin/rendezvous']);
        break;
      case 'Ordonnances':
        this.router.navigate(['medecin/ordonnances']);
        break;
      case 'Rapports':
        this.router.navigate(['medecin/rapports']);
        break;
      default:
        console.warn('Menu inconnu');
    }
  }




}