import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../services/auth/auth.reducer';
import { logout } from '../../services/auth/auth.actions';
import { UserService } from '../../services/patients/user.service';
import { AdminUser, UsersResponseFront } from '../../../types';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, CommonModule, SideBarComponent, FormsModule, ModaldialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  isSidebarOpen: boolean = false;
  modalDialog: any;
  userName: string = "Belaid";


  searchQuery = '';
  sortCriteria = '';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private store: Store<AuthState>, private CreateUserService: UserService) { }

  results :AdminUser[] = []
  medcins : AdminUser[] = []
  radio : AdminUser[] = []
  infer : AdminUser[] = []
  pat : AdminUser[] = []
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchAllUsers(1)
    console.log("1")
  }

  fetchAllUsers(page: number): void {
    this.CreateUserService.getAllUsers(page).subscribe({
      next: (users: UsersResponseFront) => {
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
            const medecins = this.results.filter(user => user.role === 'medecin');
            this.infer = this.results.filter(user => user.role === 'infermier');
            this.radio = this.results.filter(user => user.role === 'radiologue');
            this.pat = this.results.filter(user => user.role === 'patient');
            this.medcins  =medecins
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

  // Helper method to extract the page number from the "next" URL
  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);  // Extract the page number from the URL
    return match ? parseInt(match[1], 10) : 1;  // Return the page number or 1 if not found
  }

  // Method to toggle the sidebar
  toggleSidebar(isExpanded: boolean) {
    this.isSidebarOpen = !isExpanded;
  }

  // Filtered and sorted users based on search and criteria
  get filteredAndSortedUsers() {
    let filtered = this.results;

    // Filter by search query (first name and last name)
    if (this.searchQuery.trim()) {
      filtered = filtered.filter((user) =>
        `${user.username || ''} ${user.username || ''}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }

    // Filter by role (e.g., patient, admin, doctor)
    if (this.sortCriteria) {
      filtered = filtered.filter((user) =>
        user.role.toLowerCase() === this.sortCriteria.toLowerCase()
      );
    }

    // Sort based on selected criteria
    if (this.sortCriteria === 'medecin') {
      filtered = filtered.sort((a, b) => a.username.localeCompare(b.username));
    } else if (this.sortCriteria === 'radiologue') {
      filtered = filtered.sort((a, b) => a.role.localeCompare(b.role));
    } else if (this.sortCriteria === 'infirmier') {
      filtered = filtered.sort((a, b) => a.username.localeCompare(b.username));
    } else if (this.sortCriteria === 'admin') {
      filtered = filtered.sort((a, b) => a.username.localeCompare(b.username));
    } else if (this.sortCriteria === 'patient') {
      filtered = filtered.sort((a, b) => a.username.localeCompare(b.username));
    }

    // Pagination
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return filtered.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.results.length / this.itemsPerPage);
  }

  // Handle pagination
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

  /**************************POP-UP************************* */
  modalMessage: string = 'Are you sure you want to delete this user?';
  userIdToDelete: number | null = null;

  onDeleteUser(userId: number): void {
    this.userIdToDelete = userId;
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  // Delete a user from the dynamic list
  deleteUser(id: number) {
    this.results = this.results.filter((user) => user.id !== id);
  }

  onConfirmDelete(isConfirmed: boolean): void {
    if (isConfirmed && this.userIdToDelete !== null) {
      this.deleteUser(this.userIdToDelete);
    }
    this.userIdToDelete = null; // Reset userIdToDelete after confirmation

    // Hide modal dialog
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }
}
