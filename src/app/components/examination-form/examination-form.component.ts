import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedecinService } from '../../services/medecin/medecin.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/patients/user.service';
import { AdminUser, LaborantinList, RadiologueList, UsersResponseFront } from '../../../types';
import { AuthState } from '../../services/auth/auth.reducer';

interface Exams {
  type: string;
  state: string;
}

@Component({
  selector: 'app-examination-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './examination-form.component.html',
  styleUrls: ['./examination-form.component.css']
})
export class ExaminationFormComponent {
  @Output() examinationCreated = new EventEmitter<any>();
  @Input() addExamination: boolean = false;
  @Input() consultationId: string = "";

  examinationForm: FormGroup;
  types = ['labo', 'radio'];
  priorites = ['normal', 'urgent', 'tres_urgent'];
  id: string = '';
  labos: LaborantinList[] = [];
  radio: RadiologueList[] = [];
  authState: AuthState | null = null;

  @Output() examinationsList = new EventEmitter<Exams>();
  constructor(
    private fb: FormBuilder,
    private medService: MedecinService,
    private userService: UserService
  ) {
    this.examinationForm = this.fb.group({
      type: ['', Validators.required],
      priorite: ['', Validators.required],
      doctor_details: [''],
      radiologue_id: [{ value: '', disabled: false}],
      laborantin_id: [{ value: '', disabled: false }],
    });

    const jsonData = localStorage.getItem('authState');
    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        this.id = this.authState?.centre_hospitalier_id || '';
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
  }

  ngOnInit(): void {
    this.fetchLaborantinsAndRadiologues(1);
  }

  fetchLaborantins(page: number): void {
    this.medService.getLaborantins(this.id, page).subscribe({
      next: (response) => {
        this.labos = [...this.labos, ...response.results];
        if (response.next) {
          const nextPage = this.getPageNumberFromUrl(response.next);
          this.fetchLaborantins(nextPage);
        }
      },
      error: (err) => {
        console.error('Error fetching laborantins:', err);
      }
    });
  }

  fetchRadiologues(page: number): void {
    this.medService.getRadiologues(this.id, page).subscribe({
      next: (response) => {
        this.radio = [...this.radio, ...response.results];
        if (response.next) {
          const nextPage = this.getPageNumberFromUrl(response.next);
          this.fetchRadiologues(nextPage);
        }
      },
      error: (err) => {
        console.error('Error fetching radiologists:', err);
      }
    });
  }

  fetchLaborantinsAndRadiologues(page: number): void {
    this.fetchLaborantins(page);
    this.fetchRadiologues(page);
  }

  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }

  onTypeChange(type: string): void {
    if (type === 'labo') {
      this.examinationForm.get('laborantin_id')?.enable();
      this.examinationForm.get('radiologue_id')?.disable();
    } else if (type === 'radio') {
      this.examinationForm.get('radiologue_id')?.enable();
      this.examinationForm.get('laborantin_id')?.disable();
    } else {
      this.examinationForm.get('radiologue_id')?.disable();
      this.examinationForm.get('laborantin_id')?.disable();
    }
  }

  closeModal(): void {
    this.addExamination = !this.addExamination;
    this.examinationForm.reset();
  }

  onSubmit(): void {
    if (this.examinationForm.valid) {
      const formData = this.examinationForm.value;
  
      // Remove the unused field based on the type
      if (formData.type === 'labo') {
        delete formData.radiologue_id; // Remove radiologue_id
      } else if (formData.type === 'radio') {
        delete formData.laborantin_id; // Remove laborantin_id
      }
  
      // Emit the selected data
      this.examinationsList.emit({
        type: formData.type,
        state: formData.priorite,
      });
  
      // Call the service to create the examination
      this.medService.createExamination(this.consultationId, formData).subscribe(
        (response) => {
          console.log('Examination created successfully:', response);
          this.examinationCreated.emit(response);
          this.closeModal();
        },
        (error) => {
          console.error('Error creating examination:', error);
          alert('An error occurred while creating the examination. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
