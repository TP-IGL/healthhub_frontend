import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Rendezvous, TableaurdvComponent } from '../../components/tableaurdv/tableaurdv.component'
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';

@Component({
  selector: 'app-rapports',
  imports: [CommonModule, ModaldialogComponent, SideBarMedecinComponent],
  templateUrl: './rapports.component.html',
  styleUrl: './rapports.component.css'
})
export class RapportsComponent {
    /*******************************************SIDEBARRRRR*********************** */
  isSidebarOpen :boolean=false;
  

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }



  selectedMenu = 'Rapports'; // État pour suivre le menu actif

  constructor(private router: Router) {} 

  activeItem: string = 'Rapports';
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
