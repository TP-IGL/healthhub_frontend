import { Component } from '@angular/core';
import { Route ,RouterOutlet } from '@angular/router';
import { AppComponent } from "../../app.component";
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule,CommonModule,SideBarComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  isSidebarOpen :boolean=false;

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }
  userName:string="Belaid";



  users = [
    { id: 1, nom: 'Doe', prenom: 'John', telephone: '123456789', role: 'Admin',email : 'mciojf'},
    { id: 2, nom: 'Smith', prenom: 'Jane', telephone: '987654321', role: 'Medecin',email : 'mciojf' },
    { id: 3, nom: 'Brown', prenom: 'Lisa', telephone: '456789123', role: 'Patient',email : 'mciojf' },
    // Ajoutez plus de données...
  ];

  // Recherche, tri et pagination
  searchQuery = '';
  sortCriteria = '';
  currentPage = 1;
  itemsPerPage =20;

  // Obtenez les utilisateurs filtrés et triés
  get filteredAndSortedUsers() {
    let filtered = this.users;
  
    // Filtrage par recherche (nom et prénom)
    if (this.searchQuery.trim()) {
      filtered = filtered.filter((user) =>
        `${user.nom || ''} ${user.prenom || ''}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  
    // Filtrage par rôle spécifique (patient, admin, médecin)
    if (this.sortCriteria) {
      filtered = filtered.filter((user) => 
        user.role.toLowerCase() === this.sortCriteria.toLowerCase()
      );
    }
  
    // Tri selon le critère choisi
    if (this.sortCriteria === 'medecin') {
      filtered = filtered.sort((a, b) =>
        a.nom.localeCompare(b.nom)
      );
    } else if (this.sortCriteria === 'radiologue') {
      filtered = filtered.sort((a, b) =>
        a.role.localeCompare(b.role)
      );
    } else if (this.sortCriteria === 'infirmier') {
      filtered = filtered.sort((a, b) =>
        a.nom.localeCompare(b.nom)
      );
    } else if (this.sortCriteria === 'admin') {
      filtered = filtered.sort((a, b) =>
        a.nom.localeCompare(b.nom)
      );
    } else if (this.sortCriteria === 'patient') {
      filtered = filtered.sort((a, b) =>
        a.nom.localeCompare(b.nom)
      );
    }
    // Pagination
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
  
    return filtered.slice(start, end);
  }
  
  

    
  

  get totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  // Gérer la pagination
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

  // Supprimer un utilisateur
  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
