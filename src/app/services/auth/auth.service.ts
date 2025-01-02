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
    this.http.post<{ token: string , user : { username : string , id : string , email : string , role : string ,centre_hospitalier_id : string } }>(this.apiURL, { username, password })
      .subscribe({
        next: (response) => {
          console.log(response.user)
          if (response.token) {
            this.store.dispatch(loginSuccess({ token: response.token , username : response.user.username , id : response.user.id , email:response.user.email , role:response.user.role , centre_hospitalier_id:response.user.centre_hospitalier_id})); // Dispatch login success action
            this.saveToken(response.token)
            this.redirectBasedOnRole(response.user.role , response.user.id)
        
          }
        },
        error: (error) => {
          this.store.dispatch(loginFailure({ error :  error.error.detail || 'Login failed' })); // Dispatch login failure action
        }
      });
  }
  

  saveToken(token: string): void {
    localStorage.setItem('access_token', token); // Save the token to localStorage
    this.router.navigate(['/dashboard']); // Redirect to dashboard on successful login
  }
  redirectBasedOnRole(role: string, id: string): void {
    if (role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else if (role === 'medecin') {
      this.router.navigate([`/medecin/${id}/patients`]);
    } else if (role === 'patient') {
      this.router.navigate([`/patient/${id}`]);
    } else {
      this.router.navigate(['/']); // Default fallback
    }
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
