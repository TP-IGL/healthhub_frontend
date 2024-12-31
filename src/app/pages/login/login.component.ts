import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../services/auth/auth.reducer';
import { selectError } from '../../services/auth/auth.selectors';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] , 
  imports : [MatIconModule , CommonModule , ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error : string | null = null 
  constructor(private authServices : AuthService  , private store :Store<{auth : AuthState}> ) {
    // Initialize the form group with form controls and validators
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),  // You can add other validators as needed
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),  // Adjust the password validation as necessary
    });
  }

  ngOnInit(): void {
    // Any additional initialization code
  }

  // onLogin method is called on form submit
  onLogin(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authServices.login(username , password)
      this.store.select((state) => state.auth.error).subscribe((error) => {
        this.error = error;
      });
      // Here, you can handle the login logic
    } else {
      // Handle form invalid case
      this.error = "Form is invalid"
    }
  }
}
