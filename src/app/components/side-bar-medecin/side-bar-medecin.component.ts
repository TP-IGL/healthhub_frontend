
import { Component, Output , EventEmitter , Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { MedecinService } from '../../services/medecin/medecin.service';
import { AuthState } from '../../services/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { logout } from '../../services/auth/auth.actions';
interface menuItems {
  name : string ; 
  icon : string ; 
  path : string 
}
@Component({
  selector: 'app-side-bar-medecin',
  imports: [MatIconModule,CommonModule],
  templateUrl: './side-bar-medecin.component.html',
  styleUrl: './side-bar-medecin.component.css'
})
export class SideBarMedecinComponent {
  authState : AuthState| null = null ; 
  medName : string | null = "ahmed"
  id : string | null = null
  menuItems : menuItems[] = []
  constructor(private router: Router ,private medService : MedecinService , private store : Store<AuthState>) {
    const jsonData = localStorage.getItem('authState');

    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        if (this.authState) {
          this.medName =this.authState?.username
          this.id = this.authState.id
          this.menuItems = [
            { name: 'Patients', icon: 'people', path: `medecin/${this.id}/patients` },
            { name: 'Rendez-vous', icon: 'event', path: `medecin/${this.id}/rendezvous` },
          ];
        }
        
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }
  //activeItem = 'Patients';





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

  logout() {
    this.store.dispatch(logout())
    this.router.navigate(["/"])
  }

 

}
