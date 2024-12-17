import { Component, Output , EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [MatIconModule,CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isSidebarOpen :boolean=true;
 @Output()  isSidebarOpenR : EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSidebar()  : void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarOpenR.emit(this.isSidebarOpen);
  }
}
