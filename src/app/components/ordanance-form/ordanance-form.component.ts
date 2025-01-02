import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicationInput } from '../../../types';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedecinService } from '../../services/medecin/medecin.service';

@Component({
  selector: 'app-ordanance-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ordanance-form.component.html',
  styleUrls: ['./ordanance-form.component.css'],
})
export class OrdananceFormComponent {
  constructor(private medService: MedecinService) {}

  @Output() medicationsAdded = new EventEmitter<MedicationInput[]>();
  @Input() addOrd: boolean = false;
  @Input() consultationId: string | null = null;

  medications: MedicationInput[] = [];
  newMedication: MedicationInput = {
    nom: '',
    type: 'comprime',
    description: '',
    dosage: 'faible',
    duree: '',
    frequence: '',
    instructions: '',
  };

  addMedication() {
    this.medications.push({ ...this.newMedication });
    this.resetForm();
  }

  resetForm() {
    this.newMedication = {
      nom: '',
      type: 'comprime',
      description: '',
      dosage: 'faible',
      duree: '',
      frequence: '',
      instructions: '',
    };
  }

  saveMedications() {
    if (this.medications.length > 0 && this.consultationId) {
      this.medicationsAdded.emit(this.medications);
      this.medService.createPrescription(this.consultationId, this.medications).subscribe(
        (response) => {
          console.log('Medications added:', response);
          alert('Medications added successfully!');
        },
        (error) => {
          console.error('Error adding medications:', error);
          alert('An error occurred while adding medications. Please try again.');
        }
      );
      this.addOrd = !this.addOrd;
    } else {
      alert('No medications added. Please add some medications before saving.');
    }
  }
}
