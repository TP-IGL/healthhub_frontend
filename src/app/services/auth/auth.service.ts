import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = 'http://localhost:8000/api/auth/login/'; // Django API endpoint for login

  constructor(private http: HttpClient, private router: Router, private store: Store<{auth : AuthState}>) {}

  login(username: string, password: string) {
    this.http.post<{ token: string }>(this.apiURL, { username, password })
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.store.dispatch(loginSuccess({ token: response.token})); // Dispatch login success action
            this.saveToken(response.token);

        
          }
        },
        error: (error) => {
          this.store.dispatch(loginFailure({ error :  error.error.detail || 'Login failed' })); // Dispatch login failure action
          console.log("true errto is : " )
          console.log(error.error.detail)
        }
      });
  }
  

  saveToken(token: string): void {
    localStorage.setItem('access_token', token); // Save the token to localStorage
    this.router.navigate(['/dashboard']); // Redirect to dashboard on successful login
  }

  getToken(): string | null {
    return localStorage.getItem('access_token'); // Retrieve the token from localStorage
  }

  checkAuthentication(): boolean {
    // Check if the token exists in localStorage
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token'); // Remove the token from localStorage
    this.store.dispatch(logout()); // Dispatch logout action
    this.router.navigate(['/']); // Redirect to login page
  }

  isLoggedIn(): boolean {
    // Return authentication state by checking the store state
    let isAuthenticated = false;
    this.store.select((state) => state.auth.isAuthenticated).subscribe((authState) => {
      isAuthenticated = authState;
    });
    return isAuthenticated;
  }
}
