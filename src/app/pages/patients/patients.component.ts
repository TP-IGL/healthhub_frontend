import { Component  , SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MedCardsComponent } from '../../components/med-cards/med-cards.component';
import { PatientsTableComponent } from "../../components/patients-table/patients-table.component";
import { AddPatientModalComponent } from "../../components/add-patient-modal/add-patient-modal.component";
@Component({
  selector: 'app-patients',
  imports: [CommonModule, SideBarComponent, MedCardsComponent, PatientsTableComponent, AddPatientModalComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  isSidebarOpen :boolean=false;
  isModalOpen:boolean = false;
  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

}
