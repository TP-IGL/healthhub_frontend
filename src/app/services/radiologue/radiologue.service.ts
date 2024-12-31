import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthState } from '../auth/auth.reducer';
import { catchError, map, Observable, of } from 'rxjs';
import { RadiologueExamenDetail, RadiologueExamenResponse, RadiologueExamenSummary, ResultatRadio } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class RadiologueService {

  constructor(private http: HttpClient) {}
  private radioURL: string = 'http://127.0.0.1:8000/api/radiologue/';
  private getAuthHeaders(): HttpHeaders | null {
    const jsonData = localStorage.getItem('authState');
    let authState: AuthState| null = null;

    if (jsonData) {
      try {
        authState = JSON.parse(jsonData);
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }

    if (authState?.isAuthenticated && authState?.role === 'admin' && authState?.token) {
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


  getExamenes(
    status?: string,
    typeRadio?: string,
    search?: string,
    page: number = 1
  ): Observable<RadiologueExamenResponse| null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    let params = `?page=${page}`;
    if (status) params += `&status=${status}`;
    if (typeRadio) params += `&type_radio=${typeRadio}`;
    if (search) params += `&search=${search}`;

    return this.http
      .get<RadiologueExamenResponse>(`${this.radioURL}/examen/${params}`, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching radiologist exams:', error);
          return of(null);
        })
      );
  }


  // get hestoire 
  getCompletedActivities(page: number = 1): Observable<RadiologueExamenResponse | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    const params = `?page=${page}`;

    return this.http
      .get<RadiologueExamenResponse>(`${this.radioURL}/examen/historique/${params}`, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching completed activities:', error);
          return of(null);
        })
      );
  }


  // get detailed exams 
  getExamenDetails(examenId: string): Observable<RadiologueExamenDetail | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    return this.http
      .get<RadiologueExamenDetail>(`${this.radioURL}/examen/${examenId}/`, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching examen details:', error);
          return of(null);
        })
      );
  }

  // create radio 
  createRadiologyResult(examenId: string, radioImgURL: string, type: string, rapport: string): Observable<ResultatRadio | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    const body = {
      radioImgURL,
      type,
      rapport,
      examen: examenId,
    };

    return this.http
      .post<ResultatRadio>(`${this.radioURL}/examen/${examenId}/create-resultat-radio/`, body, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error creating radiology result:', error);
          return of(null);
        })
      );
  }
  // start activity
  startActivity(examenId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    return this.http
      .patch<any>(`${this.radioURL}/examen/${examenId}/start/`, {}, { headers }) // Sending an empty body
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error starting activity:', error);
          return of(null);
        })
      );
  }

  // validate 
  validateActivity(examenId: number, nurseObservations: string): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null);
    }

    const body = {
      nurse_observations: nurseObservations
    };

    return this.http
      .patch<any>(`${this.radioURL}/examen/${examenId}/validate/`, body, { headers })
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error validating activity:', error);
          return of(null);
        })
      );
  }
}
