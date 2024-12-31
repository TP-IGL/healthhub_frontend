import { Component, Output , EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { logout } from '../../services/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../services/auth/auth.reducer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  imports: [MatIconModule,CommonModule , RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isSidebarOpen :boolean=true;
 @Output()  isSidebarOpenR : EventEmitter<boolean> = new EventEmitter<boolean>();
 constructor(private store : Store<AuthState> , private router : Router) {}
  toggleSidebar()  : void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarOpenR.emit(this.isSidebarOpen);
  }
  Logout() : void {
    this.store.dispatch(logout())
    this.router.navigate(["/"])
  }
  AddUserPage() : void {
    this.router.navigate(["/addPerson"])
  }
}
