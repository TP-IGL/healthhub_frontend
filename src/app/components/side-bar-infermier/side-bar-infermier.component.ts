import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InfermierService } from '../../services/infermier/infermier.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../services/auth/auth.reducer';
import { logout } from '../../services/auth/auth.actions';
interface menuItems {
  name : string ; 
  icon : string ; 
  path : string 
}
@Component({
  selector: 'app-side-bar-infermier',
  imports: [CommonModule,MatIconModule],
  templateUrl: './side-bar-infermier.component.html',
  styleUrl: './side-bar-infermier.component.css'
})
export class SideBarInfermierComponent {
      menuItems : menuItems[] | null = null
      infermierName : string | null = null
      authState : AuthState | null = null
      id :string | null = null
      constructor(private router: Router ,private inferServices : InfermierService , private store : Store<AuthState>) {
        const jsonData = localStorage.getItem('authState');
    
        if (jsonData) {
          try {
            this.authState = JSON.parse(jsonData);
            if (this.authState) {
              this.infermierName=this.authState?.username
              this.id = this.authState.id
              this.menuItems = [
       
                { name: 'Activités', icon: 'assignment', path: `infermier/${this.id}` },
               
              ];
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
      
       @Input() laboname: string = ''
       @Input() activeItem: string = '';
    
      selectMenu(item: { name: string; path: string }) {
        this.activeItem = item.name;
        this.menuSelected.emit(item.name); 
        this.router.navigate([item.path]);
        
       // Émet l'élément du menu sélectionné
      }
      logout() : void {
        this.store.dispatch(logout())
        this.router.navigate(["/"])
      }
    }


