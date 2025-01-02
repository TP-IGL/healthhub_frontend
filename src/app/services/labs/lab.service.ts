import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthState } from '../auth/auth.reducer';
import { Observable, of } from 'rxjs';
import { Examens, ExamRequired, ResultatLaboCreate, ResultatLaboHistory } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor( private http : HttpClient) {}
  labURL = 'http://127.0.0.1:8000/api/laborantin/exams/'
  historyURL = "http://127.0.0.1:8000/api/laborantin/patient-history"
  createLabURL = "http://127.0.0.1:8000/api/laborantin/submit-test/"
  examURL = 'http://127.0.0.1:8000/api/laborantin/examinations/'
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

    if (authState?.isAuthenticated  && authState?.token) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Token ${authState.token}`,
        'Content-Type': 'application/json',
      });
      return httpHeader;
    } else {
      console.error('Unauthorized: User is not authenticated or not a medecin');
      return null;
    }
  }

  getExams(page: number): Observable<{
    count:number,
    next: string | null,
    previous: string | null,
    results: ExamRequired[]
  } | null> {
    const url = `${this.labURL}?page=${page}`;
    const header = this.getAuthHeaders()
    if (header) {
      return this.http.get<{
        count:number,
        next: string | null,
        previous: string | null,
        results: ExamRequired[]
      } | null>(url , {headers:header});
    }else {
      return of(null)
    }

  }


  getPatientHistory(nss: string, page: number): Observable<{
    count : number ; 
    next : string | null ; 
    previous : string | null ; 
    results : ResultatLaboHistory[]  
  } | null> {
    const url = `${this.historyURL}/${nss}/?page=${page}`;
    const headers = this.getAuthHeaders() 
    if (headers) {
      return this.http.get<{
        count : number ; 
        next : string | null ; 
        previous : string | null ; 
        results : ResultatLaboHistory[]
      } >(url , {headers : headers});
    }else {
      return of(null)
    }

  }

  submitTest(data: ResultatLaboCreate ): Observable<ResultatLaboCreate | null> {
    const headers = this.getAuthHeaders()
    if (headers ) {
      return this.http.post<ResultatLaboCreate>(this.createLabURL,  data ,  {headers : headers});
    }else {
      return of(null)
    }
    
  }

     // Fetch examination details by ID
     getExaminationById(examId: string): Observable<Examens> {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Authorization failed');
      }
  
      const url = `${this.examURL}${examId}/`;
      return this.http.get<Examens>(url, { headers });
    }

}
