import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/patients/user.service';
import { Router } from '@angular/router';  // Correct Router import from Angular
import { AdminUser, medFront, UsersResponseFront } from '../../../types';

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
              private router: Router , 
            ) { // Ensure Router is injected correctly
    // Initialize the form based on PatientCreate interface
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      NSS: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // NSS should be 10 digits
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
  results :AdminUser[] = []
  medcins : AdminUser[] = []
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchAllUsers(1)
    console.log("1")
  }

  fetchAllUsers(page: number): void {
    this.CreateUserService.getAllUsers(page).subscribe({
      next: (users: UsersResponseFront) => {
        if (users) {
          // Append current page results
          this.results = [...this.results, ...users.results];
          // If there is a next page, recursively fetch the next page
          if (users.next) {
            const nextPage = this.getPageNumberFromUrl(users.next);
            this.fetchAllUsers(nextPage); // Recursive call to fetch the next page
          } else {
            // All pages are fetched, you can log or do something with the results
            // If needed, filter users by role here
            const medecins = this.results.filter(user => user.role === 'medecin');
            this.medcins  =medecins
          }
        } else {
          console.log('No users found or an error occurred.');
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  // Helper method to extract the page number from the "next" URL
  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);  // Extract the page number from the URL
    return match ? parseInt(match[1], 10) : 1;  // Return the page number or 1 if not found
  }
  // Submit the form
  onSubmit() {
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value }; // Clone the form data
  
      // Call the service to create the patient
      this.CreateUserService.createPatient(formData).subscribe(response => {
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
