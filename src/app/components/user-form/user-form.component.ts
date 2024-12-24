import { Component } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule  , CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;

  roles = ['Médecin', 'Patient', 'Radiologue'];

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.userForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      nss: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      medecinName: ['', [Validators.required, Validators.minLength(3)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]],
    });
  }

  // Submit the form
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      alert('User added successfully!');
    } else {
      console.log('Form is invalid');
      alert('Please fill all fields correctly.');
    }
  }

  // Reset the form
  onReset() {
    this.userForm.reset();
  }
}
