import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { StatsComponent } from '../stats/stats.component';
import { StatsCardComponent } from "../../components/stats-card/stats-card.component";
import { UserFormComponent } from '../../components/user-form/user-form.component';
@Component({
  selector: 'app-add-user',
  imports: [CommonModule, SideBarComponent , StatsCardComponent , UserFormComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  isSidebarExpanded: boolean = true; // Default state
  num :number = 16 
  jobs = [
    { job: "Les docteurs", number: 20, image: "/assets/docteur.svg" },
    { job: "Les radiologues", number: 20, image: "/assets/radiologue.png" },
    { job: "Les patients", number: 20, image: "/assets/patient.svg" },
    { job: "Les infirmiers", number: 20, image: "/assets/infermier.svg" }
  ];

  isSidebarOpen :boolean=false;
  modalDialog: any;

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }
  userName:string="Belaid";
}
