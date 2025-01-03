import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthState } from '../../services/auth/auth.reducer';
import { logout } from '../../services/auth/auth.actions';
import { RadiologueService } from '../../services/radiologue/radiologue.service';
interface routes  {
  name : string , icon:string , path:string
}
@Component({
  selector: 'app-side-bar-radiologue',
  imports: [MatIconModule,CommonModule],
  templateUrl: './side-bar-radiologue.component.html',
  styleUrl: './side-bar-radiologue.component.css'
})
export class SideBarRadiologueComponent {

       
      authState: AuthState | null = null 
      radName : string | null = ''
      id : string | null = ''
      menuItems : routes[] = []
      constructor(private router: Router ,private radService : RadiologueService , private store : Store<AuthState>) {
        const jsonData = localStorage.getItem('authState');
    
        if (jsonData) {
          try {
            this.authState = JSON.parse(jsonData);
            if (this.authState) {
              this.radName =this.authState?.username
              this.id = this.authState.id
              this.menuItems = [
                { name: 'Acceuil', icon: 'home', path: `radiologue/${this.id}` },
                { name: 'Examens', icon: 'assignment', path: `radiologue/${this.id}/examens` },]
            }
            
          } catch (error) {
            console.error('Error parsing auth state from localStorage:', error);
          }
        }
      }
    
      isSidebarOpen :boolean=true;
     @Output()  isSidebarOpenR : EventEmitter<boolean> = new EventEmitter<boolean>();
    
      toggleSidebar()  : void {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.isSidebarOpenR.emit(this.isSidebarOpen);
      }
      
      @Output() menuSelected = new EventEmitter<string>();
      
       @Input() radiologuename: string = ''
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
