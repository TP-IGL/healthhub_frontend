import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultation, Consultations } from '../../../types';
@Component({
  selector: 'app-consultation-modal',
  imports: [CommonModule],
  templateUrl: './consultation-modal.component.html',
  styleUrl: './consultation-modal.component.css'
})
export class ConsultationModalComponent {
  @Input() isModalOpen : boolean = false ; 
  @Input() consultation :Consultations | null = null
  toggleModalOpen() {
    this.isModalOpen = !this.isModalOpen
  }
}
