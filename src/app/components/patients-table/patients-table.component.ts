import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 

@Component({
  selector: 'app-patients-table',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css'],
  providers: [DatePipe]
})
export class PatientsTableComponent {
  users = [
    {
      name: 'Olivia Rhye',
      email: '@Olivia',
      Status: 'Active',
      lastVisit: new Date('2024-01-01'),
      phone: '+213 675-788-568',
      nextAppointment: new Date('2024-01-10'),
      photo: '/assets/pic.png'
    },
    {
      name: 'James Johnson',
      email: '@James',
      Status: 'Active',
      lastVisit: new Date('2024-02-15'),
      phone: '+213 676-123-456',
      nextAppointment: new Date('2024-03-01'),
      photo: '/assets/pic.png'
    },
    {
      name: 'Emily Carter',
      email: '@Emily',
      Status: 'Sorite',
      lastVisit: new Date('2024-01-20'),
      phone: '+213 677-987-654',
      nextAppointment: new Date('2024-02-15'),
      photo: '/assets/pic.png'
    },
    {
      name: 'Daniel Wilson',
      email: '@Daniel',
      Status: 'En consultation',
      lastVisit: new Date('2024-01-05'),
      phone: '+213 678-654-321',
      nextAppointment: new Date('2024-01-25'),
      photo: '/assets/pic.png'
    },
    {
      name: 'Sophia Brown',
      email: '@Sophia',
      Status: 'Sorite',
      lastVisit: new Date('2024-02-01'),
      phone: '+213 679-321-987',
      nextAppointment: new Date('2024-02-20'),
      photo: '/assets/pic.png'
    }
  ];

  isAscending = true;
  page: number = 1; 
  itemsPerPage: number = 3; 
  currentPage: number = 1;

  constructor(private datePipe: DatePipe) {}

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  sortByStatus() {
    this.users.sort((a, b) => {
      if (this.isAscending) {
        return a.Status.localeCompare(b.Status);
      } else {
        return b.Status.localeCompare(a.Status);
      }
    });
    this.isAscending = !this.isAscending;
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  getUser() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
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
