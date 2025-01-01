import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/patients/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;

  roles = ['medecin', 'Patient', 'radiologue', 'infermier', 'pharmacien', 'laborantin'];

  constructor(private fb: FormBuilder, private route: Router, private AddUserService: UserService) {
    // Initialize the form
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      centreHospitalier: [null],
    });
  }

  // Submit the form
  onSubmit() {
    if (this.userForm.valid) {
      this.AddUserService.createUser(this.userForm.value).subscribe({
        next: (result) => {
          console.log('Results:', result);
          alert('User created successfully!');
          this.route.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error creating user:', err);
          alert('Failed to create user. Please try again later.');
        },
      });
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
