import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompletedActivityResponse, NurseActivityResponse, ValidateActivite } from '../../../types';
import { AuthState } from '../auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class InfermierService {
  private nurseUrl: string = 'http://127.0.0.1:8000/api/infermier/activites/';

  constructor(private http: HttpClient) {}

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

    if (authState?.isAuthenticated && authState?.role === 'infermier' && authState?.token) {
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


  // get nurse activity /infermier/activites/
  getActivities(
    status?: string,
    typeActivite?: string,
    search?: string,
    page: string = '1'
  ): Observable<NurseActivityResponse | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    let params = `?page=${page}`;
    if (status) params += `&status=${status}`;
    if (typeActivite) params += `&type_activite=${typeActivite}`;
    if (search) params += `&search=${search}`;

    return this.http
      .get<NurseActivityResponse>(`${this.nurseUrl}${params}`, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching activities:', error);
          return of(null);
        })
      );
  }

  // completed activity of nurse

  getCompletedActivities(page: number = 1): Observable<CompletedActivityResponse | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    const params = `?page=${page}`;

    return this.http
      .get<CompletedActivityResponse>(`${this.nurseUrl}${params}`, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching completed activities:', error);
          return of(null);
        })
      );
  }

  // get activity by id 
  getActivityById(activityId: number): Observable<ValidateActivite | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    return this.http
      .get<ValidateActivite>(`${this.nurseUrl}${activityId}/`, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching activity by ID:', error);
          return of(null);
        })
      );
  }


  // start activiy
  startActivity(activityId: number): Observable<boolean> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(false);
    }

    return this.http
      .patch<void>(`${this.nurseUrl}${activityId}/start/`, {}, { headers })
      .pipe(
        map(() => true), // Return true if the request is successful
        catchError((error) => {
          console.error('Error starting activity:', error);
          return of(false);
        })
      );
  }

  // validate acitvity 
  validateActivity(activityId: number, nurseObservations: string): Observable<ValidateActivite | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    const body = { nurse_observations: nurseObservations };

    return this.http
      .patch<ValidateActivite>(`${this.nurseUrl}${activityId}/validate/`, body, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error validating activity:', error);
          return of(null);
        })
      );
  }
}
