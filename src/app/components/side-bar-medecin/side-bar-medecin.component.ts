
import { Component, Output , EventEmitter , Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
@Component({
  selector: 'app-side-bar-medecin',
  imports: [MatIconModule,CommonModule],
  templateUrl: './side-bar-medecin.component.html',
  styleUrl: './side-bar-medecin.component.css'
})
export class SideBarMedecinComponent {

  //activeItem = 'Patients';

  menuItems = [
    { name: 'Patients', icon: 'people', path: 'medecin/:id/patients' },
    { name: 'Rendez-vous', icon: 'event', path: 'medecin/rendezvous' },
    { name: 'Ordonnances', icon: 'description', path: 'medecin/ordonnances' },
    { name: 'Rapports', icon: 'bar_chart', path: 'medecin/rapports' },
  ];
  constructor(private router: Router) {}

  isSidebarOpen :boolean=true;
 @Output()  isSidebarOpenR : EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSidebar()  : void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarOpenR.emit(this.isSidebarOpen);
  }
  
  @Output() menuSelected = new EventEmitter<string>();
  

   @Input() activeItem: string = '';

  selectMenu(item: { name: string; path: string }) {
    this.activeItem = item.name;
    this.menuSelected.emit(item.name); 
    this.router.navigate([item.path]);
    
   // Émet l'élément du menu sélectionné
  }

 

}
