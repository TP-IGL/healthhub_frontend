import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { StatsComponent } from '../stats/stats.component';
import { StatsCardComponent } from "../../components/stats-card/stats-card.component";
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
@Component({
  selector: 'app-add-user',
  imports: [CommonModule, SideBarComponent, StatsCardComponent, PatientFormComponent],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  isSidebarExpanded: boolean = true; // Default state
  num :number = 16 
  jobs = [
    { job: "Les docteurs", number: 20, image: "/assets/docteur.svg" },
    { job: "Les radiologues", number: 20, image: "/assets/radiologue.png" },
    { job: "Les patients", number: 20, image: "/assets/patient.svg" },
    { job: "Les infirmiers", number: 20, image: "/assets/infermier.svg" }
  ];

  isSidebarOpen :boolean=false;

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }
  userName:string="Belaid";
}
