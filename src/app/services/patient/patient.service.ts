import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthState } from '../auth/auth.reducer';
import { DossierMedicalDetail } from '../../../types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patietnURL = "http://127.0.0.1:8000/api/patient/medical-file/"
  qrcode = 'http://127.0.0.1:8000/api/patient/qr-code-nss/'
  constructor( private http : HttpClient) { }
  private getAuthHeaders(): HttpHeaders| null {
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

    // get dossize 
    getDossierMedicalDetail(type: string, id: string): Observable<DossierMedicalDetail> {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Authorization failed');
      } 
  
      const url = `${this.patietnURL}${id}/`;
  
      return this.http.get< DossierMedicalDetail  >(url, { headers });
    }

    // get qrcode data 
    getQrcode(nss :string) : Observable<{qrcode : string} | null> {
      const headers = this.getAuthHeaders() 
      if (headers) {
        return this.http.get<{qrcode : string}>(this.qrcode , {headers : headers})
      }else {
        return of(null)
      }
    }
  
}
