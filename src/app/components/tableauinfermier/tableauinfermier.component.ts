import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfermierService } from '../../services/infermier/infermier.service';
import { NurseActivity, NurseActivityDetail } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';

export interface Activity {
  examenID: number;
  consultation: string;
  patient: string;
  patient_id: string;
  type: string;
  etat: string;
  priorite: string;
  doctor_details: string;
  createdAt: string;
 
  nss: string;
}

@Component({
  selector: 'app-tableauinfermier',
  imports: [CommonModule,FormsModule],
  templateUrl: './tableauinfermier.component.html',
  styleUrl: './tableauinfermier.component.css'
})
export class TableauinfermierComponent {

  @Input() filtredActivies: Activity[] = [];
  constructor(private infServices : InfermierService , private router : Router , private route : ActivatedRoute){}
       onDetailsClick(id: string) {
        const infID = this.route.snapshot.paramMap.get('id')
        this.infServices.startActivity(id).subscribe((response)=>{
          if(response) {
            this.router.navigate([`infermier/${infID}/activitydetails/${id}`])
          }
        }) 
        
      
      }
      
        
        currentPage: number = 1;
        itemsPerPage: number = 15;
        ngOnInit(): void {
          //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
          this.fetchAllExams(1)

        }
        // Retourne le nombre total de pages en fonction du nombre de rendez-vous
        totalPages(): number {
          return Math.ceil(this.filteredActivies.length / this.itemsPerPage);
        }
      
        // Retourne les rendez-vous de la page actuelle
        paginatedAppointments(): NurseActivityDetail[] {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.filteredActivies.slice(startIndex, endIndex);
        }
      
        // Allume la pagination vers la page suivante
        nextPage(): void {
          if (this.currentPage < this.totalPages()) {
            this.currentPage++;
          }
        }
      
        // Allume la pagination vers la page précédente
        previousPage(): void {
          if (this.currentPage > 1) {
            this.currentPage--;
          }
        }
        activities : NurseActivityDetail[] = []
        filteredActivies  : NurseActivityDetail[] = []
        fetchAllExams(page: number): void {
          this.infServices.getActivities('' , '' , '' , page).subscribe({
            next: (response) => {
             
              if (response ) {
                this.filteredActivies = [...response];
                console.log(this.filteredActivies)
              } else {
                console.log('No exams found or an error occurred.');
              }
            },
            error: (err) => {
              console.error('Error fetching exams:', err);
            }
          });
        }
      
        getPageNumberFromUrl(url: string): number {
          const match = url.match(/page=(\d+)/);
          return match ? parseInt(match[1], 10) : 1;
        }
      

}
