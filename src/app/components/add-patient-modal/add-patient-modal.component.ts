import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-patient-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.css'],
})
export class AddPatientModalComponent {
  @Input() isModalOpen: boolean = false;
  userForm: FormGroup;
  statuses = ['Active', 'Sortie', 'En Consultation'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nss: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
      profileImage: ['', [Validators.required]],
      lastVisitDate: ['', [Validators.required]],
      nextAppointmentDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      alert('User information submitted successfully!');
      this.onReset();
    } else {
      console.log('Form is invalid');
      alert('Please fill all fields correctly.');
    }
  }

  onReset() {
    this.userForm.reset();
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }
}
