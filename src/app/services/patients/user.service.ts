import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PatientCreate, AdminUserCreate, UserResponse } from '../../../types';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private patientUrl: string = "http://localhost:8000/api/admin/patients/create/";
  private userUrl: string = "http://localhost:8000/api/admin/users/";

  constructor(private http: HttpClient, private store: Store<AuthState>) { }

  private getAuthHeaders(): HttpHeaders | null {
    const jsonData = localStorage.getItem('authState');
    let authState: AuthState | null = null;

    if (jsonData) {
      try {
        authState = JSON.parse(jsonData);
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }

    if (authState?.isAuthenticated && authState?.token) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Token ${authState.token}`,
        'Content-Type': 'application/json'
      })
      return httpHeader ;
    } else {
      console.error('Unauthorized: User is not authenticated or not an admin');
      return null;
    }
  }

  // Create patient method
  createPatient(patient: PatientCreate): Observable<any> {
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post(this.patientUrl, patient, { headers }).pipe(
        map(response => response),
        catchError(error => {
          console.error('Error creating patient:', error);
          return error;
        })
      );
    }else {
      return of(null)
    }

  }

  // Create user method
  createUser(user: AdminUserCreate): Observable<any> {
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post("http://localhost:8000/api/admin/users/create/", user, { headers }).pipe(
        map(response => { console.log(response) ; return response}),
        catchError(error => {
          console.error('Error creating user:', error);
          return error;
        })
      );
    }else {
      return of(null)
    }

  }

  // Get user by ID
  getUserById(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);

    return this.http.get(`${this.userUrl}${userId}/`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching user by ID:', error);
        return of(null);
      })
    );
  }

  // Delete user by ID
  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);

    return this.http.delete(`${this.userUrl}${userId}/`, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error deleting user:', error);
        return of(null);
      })
    );
  }

  // Get medical file of a patient by ID
  getMedicalFileByPatientId(patientId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);

    const medicalFileUrl = `/patient/medical-file/${patientId}/`;
    return this.http.get(medicalFileUrl, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching medical file by patient ID:', error);
        return of(null);
      })
    );
  }

  // Get all users with pagination
  getAllUsers(page: number | null): Observable<any> {
    const usersUrl = `${this.userUrl}?page=${page}`;
    
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.get<UserResponse>(usersUrl, { headers }).pipe(
        map((result) => result), // Extract only the results from the response
        catchError(error => {
          console.error('Error fetching users:', error);
          return of(null); // Return an observable with null in case of error
        })
      );
    } else {
      console.error('No headers available');
      return of(null); // Return an observable with null if no headers are available
    }
  }
  
  
  }
