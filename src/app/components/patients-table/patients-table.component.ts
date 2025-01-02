import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DossierMedicalDetail, Patients, UsersByDoctor } from '../../../types';
import { MedecinService } from '../../services/medecin/medecin.service';
import { AuthState } from '../../services/auth/auth.reducer';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-table',
  imports: [CommonModule , FormsModule],
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css'],
  providers: [DatePipe],
})
export class PatientsTableComponent implements OnInit {
  private authState: AuthState | null = null;
  private medID: string | null = null;
  private medName: string | null = null;
  results: Patients[] = [];
  patients: Patients[] = [];
  filteredPatients: Patients[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(
    private datePipe: DatePipe,
    private medService: MedecinService,
    private router: Router
  ) {
    const jsonData = localStorage.getItem('authState');
    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        if (this.authState) {
          this.medName = this.authState?.username;
          this.medID = this.authState?.id;
        }
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }

  ngOnInit(): void {
    this.fetchAllUsers(1);
  }

  fetchAllUsers(page: number): void {
    if (this.medID) {
      this.medService.listPatients(this.medID, '', '', page).subscribe({
        next: (users: UsersByDoctor) => {
          if (users) {
            this.results = [...this.results, ...users.results];
            if (users.next) {
              const nextPage = this.getPageNumberFromUrl(users.next);
              this.fetchAllUsers(nextPage);
            } else {
              this.patients = this.results;
              this.filteredPatients = [...this.patients];
            }
          }
        },
        error: (err) => console.error('Error fetching users:', err),
      });
    }
  }

  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }

  filterPatients() {
    if (this.searchTerm) {
      this.filteredPatients = this.results.filter(patient =>
        String(patient.NSS).includes(this.searchTerm)
      );
    } else {
      this.filteredPatients = [...this.results]; // Reset to original list
    }
  }
  

  goToPatient(nss: string): void {
    this.router.navigate([`medecin/${this.medID}/patients/${nss}`]);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
  }

  getUser(): Patients[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredPatients.slice(start, end);
  }
}
