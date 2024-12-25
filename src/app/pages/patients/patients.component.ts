import { Component  , SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MedCardsComponent } from '../../components/med-cards/med-cards.component';
import { PatientsTableComponent } from "../../components/patients-table/patients-table.component";
@Component({
  selector: 'app-patients',
  imports: [CommonModule, SideBarComponent, MedCardsComponent, PatientsTableComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  isSidebarOpen :boolean=false;

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }

}
