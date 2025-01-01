import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DossierMedicalDetail, Patients, UsersByDoctor } from '../../../types';
import { MedecinService } from '../../services/medecin/medecin.service';
import { AuthState } from '../../services/auth/auth.reducer';
import { Router } from '@angular/router';



@Component({
  selector: 'app-patients-table',
  imports: [CommonModule],
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css'],
  providers: [DatePipe]
})
export class PatientsTableComponent {
  private authState : AuthState | null = null
  private medID : string | null = null
  private medName : string | null = null
  constructor(private datePipe: DatePipe , private medService : MedecinService , private router : Router  ) {
    const jsonData = localStorage.getItem('authState');

    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        if (this.authState) {
          this.medName =this.authState?.username
          this.medID = this.authState?.id
        }
        
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }
    results : Patients[] = []
    patients : Patients[] = []
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.fetchAllUsers(1)
    }
    fetchAllUsers(page: number): void {
      if (this.medID) {
        this.medService.listPatients(this.medID , '' , '' , page).subscribe({
          next: (users: UsersByDoctor) => {
            if (users) {
              // Append current page results
              this.results = [...this.results, ...users.results];
              // If there is a next page, recursively fetch the next page
              if (users.next) {
                const nextPage = this.getPageNumberFromUrl(users.next);
                this.fetchAllUsers(nextPage); // Recursive call to fetch the next page
              } else {
                // All pages are fetched, you can log or do something with the results
                // If needed, filter users by role here
                this.patients = this.results
              }
            } else {
              console.log('No users found or an error occurred.');
            }
          },
          error: (err) => {
            console.error('Error fetching users:', err);
          }
        });
      } 
      
    }
  
    // Helper method to extract the page number from the "next" URL
    getPageNumberFromUrl(url: string): number {
      const match = url.match(/page=(\d+)/);  // Extract the page number from the URL
      return match ? parseInt(match[1], 10) : 1;  // Return the page number or 1 if not found
    }
  

  isAscending = true;
  page: number = 1; 
  itemsPerPage: number = 3; 
  currentPage: number = 1;



  get totalPages(): number {
    return Math.ceil(this.patients.length / this.itemsPerPage);
  }
  

  goToPatient(nss: string) {
    this.router.navigate([`medecin/${this.medID}/patients/${nss}`])
  }



  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  getUser() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.patients.slice(start, end);
  }

  // Pagination logic
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
