import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Consultation, ConsultationCreateUpdate, Consultations } from '../../../types';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedecinService } from '../../services/medecin/medecin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-modal',
  imports: [CommonModule , ReactiveFormsModule , FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {
  constructor(private medServices:MedecinService , private route : ActivatedRoute){}
  @Input() consultation: Consultations | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.save.emit(this.consultation);
    const id = this.route.snapshot.paramMap.get("patientID")

    if (this.consultation && id) {
      const data =  {
        nss: id , 
        diagnostic: this.consultation.diagnostic ,
        resume: this.consultation.resume , 
        status: this.consultation.status , 

      }
      this.medServices.updateConsultation(this.consultation?.consultationID ,data).subscribe(
        {
          next : (res)=>{
            if (res) {
              this.onClose()
            }
          },
          error : (err)=>{
            alert("can't update")
          }
        }
      )
    }


  }
}
