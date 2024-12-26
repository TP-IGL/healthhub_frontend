import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Rendezvous, TableaurdvComponent } from '../../components/tableaurdv/tableaurdv.component'
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';
@Component({
  selector: 'app-ordonnances',
  imports: [ CommonModule, ModaldialogComponent, SideBarMedecinComponent],
  templateUrl: './ordonnances.component.html',
  styleUrl: './ordonnances.component.css'
})
export class OrdonnancesComponent {
   

  /*******************************************SIDEBARRRRR*********************** */
  isSidebarOpen :boolean=false;
  

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }
   


  selectedMenu = 'Ordonnances'; // État pour suivre le menu actif

  constructor(private router: Router) {} 

   activeItem: string = 'Ordonnances';
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
