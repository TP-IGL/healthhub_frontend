import { Component } from '@angular/core';
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { CommonModule} from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { Router } from '@angular/router';
import { SideBarRadiologueComponent } from '../../components/side-bar-radiologue/side-bar-radiologue.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-radiologue',
  imports: [CommonModule,SideBarComponent,ModaldialogComponent,DonutChartComponent,SideBarRadiologueComponent,FormsModule],
  templateUrl: './radiologue.component.html',
  styleUrl: './radiologue.component.css'
})
export class RadiologueComponent  {
/**************************************************SIDEBARRRRRR************************************* */
  
  modalDialog: any;
  userName:string="Belaid";
 

    isSidebarOpen :boolean=false;
    
  
    toggleSidebar(isExpanded:boolean) {
      this.isSidebarOpen = !isExpanded;
    }
  
  
    radiologuename: string = 'Said'
    selectedMenu = 'Acceuil'; // État pour suivre le menu actif
  
    constructor(private router: Router) {} 
  
    activeItem: string = 'Acceuil';
    onMenuSelect(menu: string) {
      this.selectedMenu = menu;
      this.activeItem = menu;
      console.log(`Menu sélectionné : ${menu}`);
  
      // Navigation logique en fonction du menu sélectionné
      
      switch (menu) {
        case 'Acceuil':
          this.router.navigate(['radiologue']);
          break;
        case 'Examens':
          this.router.navigate(['radiologue/examens']);
          break;
        
        default:
          console.warn('Menu inconnu');
      }
     }

  /************************************COLONNES MOIS********************* */
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  currentMonthIndex: number = 0;

  ngOnInit(): void {
    // Obtenir l'indice du mois actuel (0 à 11)
    this.currentMonthIndex = new Date().getMonth();
  }
  data: number[] = [
     54,20,26 
  ];

}
