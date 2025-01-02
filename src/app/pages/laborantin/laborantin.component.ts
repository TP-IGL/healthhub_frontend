import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarLaborantinComponent } from '../../components/side-bar-laborantin/side-bar-laborantin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Examen, TableauLabComponent } from '../../components/tableau-lab/tableau-lab.component';
import { LabService } from '../../services/labs/lab.service';
import { ExamRequired } from '../../../types';

@Component({
  selector: 'app-laborantin',
  imports: [CommonModule, SideBarLaborantinComponent, FormsModule, TableauLabComponent],
  templateUrl: './laborantin.component.html',
  styleUrls: ['./laborantin.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class LaborantinComponent {
  modalDialog: any;
  filteredExams: ExamRequired[] | null = null;
  isSidebarOpen: boolean = false;
  laboname: string = 'Said';
  selectedMenu: string = 'Examens';
  activeItem: string = 'Examens';
  exams: ExamRequired[] = [];

  constructor(private router: Router, private labServices: LabService , private route : ActivatedRoute) {}
  id : string | null = ''
  ngOnInit(): void {
    this.fetchAllExams(1);
    if (this.route.snapshot.paramMap.get("id") != null) {
      this.id = this.route.snapshot.paramMap.get("id")
    }
  }

  toggleSidebar(isExpanded: boolean): void {
    this.isSidebarOpen = !isExpanded;
  }

  fetchAllExams(page: number): void {
    this.labServices.getExams(page).subscribe({
      next: (response) => {
        if (response) {
          this.exams = [...this.exams, ...response.results];
          if (response.next) {
            const nextPage = this.getPageNumberFromUrl(response.next);
            this.fetchAllExams(nextPage);
          } else {
            this.filteredExams = [...this.exams];
            console.log('All exams fetched:', this.exams);
          }
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

  onMenuSelect(menu: string): void {
    this.selectedMenu = menu;
    this.activeItem = menu;
    console.log(`Menu selected: ${menu}`);

    switch (menu) {
      case 'Examens':
        this.router.navigate(['laborantin']);
        break;
      default:
        console.warn('Unknown menu option');
    }
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.trim();
    if (this.exams) {
      this.filteredExams = this.exams.filter((exam) =>
        exam.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.createdAt.includes(searchTerm)
      );
    }
  }

  resetSearch(): void {
    this.filteredExams = [...this.exams];
  }

  goToDetails(examId: number): void {
    this.router.navigate([`laborantin/${examId}/examslabdetails`]);
  }
}
