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

  users: any[] = []; // Dynamic users array to be populated with API data

  searchQuery = '';
  sortCriteria = '';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private store: Store<AuthState>, private userService: UserService) { }

  ngOnInit(): void {
    // Fetch users dynamically when the component initializes
    this.userService.getAllUsers('1').subscribe(results => {
      if (results) {
        this.users = results; // Update the users array with API results
      } else {
        console.log('No users found or error occurred');
      }
    });
  }

  // Method to toggle the sidebar
  toggleSidebar(isExpanded: boolean) {
    this.isSidebarOpen = !isExpanded;
  }

  // Filtered and sorted users based on search and criteria
  get filteredAndSortedUsers() {
    let filtered = this.users;

    // Filter by search query (first name and last name)
    if (this.searchQuery.trim()) {
      filtered = filtered.filter((user) =>
        `${user.nom || ''} ${user.prenom || ''}`
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
      filtered = filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (this.sortCriteria === 'radiologue') {
      filtered = filtered.sort((a, b) => a.role.localeCompare(b.role));
    } else if (this.sortCriteria === 'infirmier') {
      filtered = filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (this.sortCriteria === 'admin') {
      filtered = filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (this.sortCriteria === 'patient') {
      filtered = filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    }

    // Pagination
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return filtered.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage);
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
    this.users = this.users.filter((user) => user.id !== id);
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
