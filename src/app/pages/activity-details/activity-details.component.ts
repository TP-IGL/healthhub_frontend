import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarInfermierComponent } from '../../components/side-bar-infermier/side-bar-infermier.component';
import { InfermierService } from '../../services/infermier/infermier.service';
import { Activity, Consultation, NurseActivity, NurseActivityDetail, PatientNurse } from '../../../types';

@Component({
  selector: 'app-activity-details',
  imports: [CommonModule,FormsModule,SideBarInfermierComponent],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})
export class ActivityDetailsComponent {

    /**************************************************SIDEBARRRRRR************************************* */
      
        modalDialog: any;
        isSidebarOpen :boolean=false;
        toggleSidebar(isExpanded:boolean) {
          this.isSidebarOpen = !isExpanded;
        }
      
      
        laboname: string = 'Said'
        selectedMenu = 'Activités';
        id : string | null = ""
        constructor(private router: Router , private inferService : InfermierService , private route : ActivatedRoute) {} 
        ngOnInit(): void {
          //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
          this.id = this.route.snapshot.paramMap.get("activityId")
          this.fetchAllExams(1)
        }
        activeItem: string = 'Activités';
        onMenuSelect(menu: string) {
          this.selectedMenu = menu;
          this.activeItem = menu;
          console.log(`Menu sélectionné : ${menu}`);
      
        
          switch (menu) {
            
            case 'Activités':
              this.router.navigate(['infermier']);
              break;
            
            default:
              console.warn('Menu inconnu');
          }
         }
         /**************************************************Details******************************** */

         activity = {
          examenID: 1,
          consultation: 'Consultation générale',
          patient: 'Mohamed Ali',
          patient_id: 'P12345',
          type: 'Général',
          etat: 'en cours', 
          priorite: 'Haute',
          doctor_details: 'Dr. Amine Boukhalfa',
          createdAt: '2025-01-01T09:00:00',
          nss: '1234567890',
          observation: '', 
        };
      
        showPopup: boolean = false;
        observationText: string = ''; 
      
        // Ouvrir le pop-up
        openPopup() {
          this.showPopup = true;
        }
      
        // Fermer le pop-up
        closePopup() {
          this.showPopup = false;
        }
      
        // Sauvegarder l'observation
        saveObservation() {
          this.activity.observation = this.observationText;
          console.log(this.observationText)
          if (this.id) {
            this.inferService.validateActivity(this.id , this.observationText).subscribe(
              {
                next : (res)=>{
                  if (res) {
                    alert("Activite validated")
                  }else {
                    alert("try again")
                  }
                },
                error : (err) => {
                  alert("try again")
                }
              }
            )
          }
          this.closePopup();
        }
        exam: Activity | undefined = undefined;
consultation: NurseActivity | null = null;
patient : PatientNurse | null = null
fetchAllExams(page: number): void {
  this.inferService.getActivities('', '', '', page).subscribe({
    next: (response) => {
      if (response) {
        // Find the matching parent object and activity
        const parent = response.find((res) =>
          res.activities.some((activity) => activity.id === this.id)
        );
        console.log(parent)
        if (parent) {
          this.exam = parent.activities.find((activity) => activity.id === this.id);
          this.consultation = parent.consultation;
          this.patient = parent.patient;
        } else {
          console.log('No matching activity found for the given ID.');
        }
      } else {
        console.log('No exams found or an error occurred.');
      }
    },
    error: (err) => {
      console.error('Error fetching exams:', err);
    },
  });
}


}
