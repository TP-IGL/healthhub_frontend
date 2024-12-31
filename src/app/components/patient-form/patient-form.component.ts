import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/patients/user.service';
import { Router } from '@angular/router';  // Correct Router import from Angular

@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {
  userForm: FormGroup;

  centreHospitaliers = [1, 2, 3]; // Example centre hospitalier options
  roles = ['Médecin', 'Patient', 'Radiologue'];

  constructor(private fb: FormBuilder, 
              private CreateUserService: UserService, 
              private router: Router) { // Ensure Router is injected correctly
    // Initialize the form based on PatientCreate interface
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nss: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // NSS should be 10 digits
      nom: ['', [Validators.required, Validators.minLength(2)]], // Patient's last name
      prenom: ['', [Validators.required, Validators.minLength(2)]], // Patient's first name
      dateNaissance: ['', [Validators.required]], // Date of birth
      adresse: ['', [Validators.required, Validators.minLength(5)]], // Address
      telephone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Telephone number
      mutuelle: ['', [Validators.required]], // Insurance info
      contactUrgence: ['', [Validators.required]], // Emergency contact
      medecin: [null], // Doctor's name (nullable)
      centreHospitalier: ['', [Validators.required]] // Hospital centre selection
    });
  }

  // Submit the form
  onSubmit() {
    if (this.userForm.valid) {
      
      // Call the service to create the patient
      this.CreateUserService.createPatient(this.userForm.value).subscribe(response => {
        if (response) {
          this.router.navigate(["/dashboard"]); // Navigate to the dashboard after successful submission
        } else {
          alert('Erreur lors de la création du patient.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  // Reset the form
  onReset() {
    this.userForm.reset();
  }
}
