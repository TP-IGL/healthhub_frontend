import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthState } from '../auth/auth.reducer';
import { ActiviteInfermier, ActiviteInfermierCreate, ConsultationCreateUpdate, Consultations, DossierMedicalDetail, Examens, ExaminationCreate, InfermierList, LaborantinListResponse, MedicationInput, OrdonnanceCreate, OrdonnanceMedicamentCreate, OrdonnancesListResponse, PatientsListResponse, prescriptionsResponse, RadiologueListResponse } from '../../../types';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedecinService {
  private medURL: string = 'http://127.0.0.1:8000/api/medecin/consultations/';
  private examURL: string = 'http://127.0.0.1:8000/api/medecin/examinations/' ; 
  private laborantinURL: string = 'http://127.0.0.1:8000/api/medecin/hospital/' 
  private docURL :string = 'http://127.0.0.1:8000/api/medecin/doctors/'
  private searchURL : string = 'http://127.0.0.1:8000/api/medecin/medecin/patients/search/'
  private baseUrl : string = "http://127.0.0.1:8000/api/medecin/infermier/"
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

    if (authState?.isAuthenticated && authState?.role === 'medecin' && authState?.token) {
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

  // Create consultation
  createConsultation(data: {
    nss: string ;
    diagnostic: string;
    resume: string;
    status: string;
  }): Observable<ConsultationCreateUpdate | null> {
    const headers = this.getAuthHeaders()
    if (headers) {
      return this.http.post<ConsultationCreateUpdate>(this.medURL, data, { headers });
    } else {
      return of(null)
    }


  }

  // Fetch consultation details by ID
  fetchConsultation(consultationID: string): Observable<Consultations> {
    const headers = this.getAuthHeaders();

    if (!headers) {
      throw new Error('Authorization headers are missing.');
    }

    const url = `${this.medURL}${consultationID}/`;
    return this.http.get<Consultations>(url, { headers });
  }

    // Update consultation (PATCH)
    updateConsultation(
      consultationID: string,
      data: {
        nss: string;
        diagnostic: string;
        resume: string;
        status: string;
      }
    ): Observable<ConsultationCreateUpdate> {
      const headers = this.getAuthHeaders();
  
      if (!headers) {
        throw new Error('Authorization headers are missing.');
      }
  
      const url = `${this.medURL}${consultationID}/`;
      return this.http.patch<ConsultationCreateUpdate>(url, data, { headers });
    }

    // Create an examination (POST)
  createExamination(
    consultationID: string,
    data:ExaminationCreate
  ): Observable<ExaminationCreate> {
    const headers = this.getAuthHeaders();

    if (!headers) {
      throw new Error('Authorization headers are missing.');
    }

    const url = `${this.medURL}${consultationID}/examinations/`;
    return this.http.post<ExaminationCreate>(url, data, { headers });
  }
    // Create a new prescription for a consultation
    createPrescription(consultationId: string,
      medicaments: MedicationInput[]
    ): Observable<prescriptionsResponse> {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Authorization failed');
      }
  
      const url = `${this.medURL}${consultationId}/prescriptions/`;
  
      return this.http.post<prescriptionsResponse>(url, {"medications" : medicaments}, { headers });
    }

      // List all prescriptions for a consultation
  listPrescriptions(consultationId: string, page: number): Observable<OrdonnancesListResponse> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      throw new Error('Authorization failed');
    }

    const url = `${this.medURL}${consultationId}/prescriptions/list/?page=${page}`;

    return this.http.get<OrdonnancesListResponse>(url, { headers });
  }

   // List all patients associated with a doctor
   listPatients(
    doctorId: string,
    search: string  = '',
    ordering: string = '',
    page: number = 1
  ): Observable<PatientsListResponse> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      throw new Error('Authorization failed');
    }

    const url = `${this.docURL}${doctorId}/patients/?search=${search}&ordering=${ordering}&page=${page}`;
    return this.http.get<PatientsListResponse>(url, { headers });
  }

   // Fetch examination details by ID
   getExaminationById(examId: number): Observable<Examens> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      throw new Error('Authorization failed');
    }

    const url = `${this.examURL}${examId}/`;
    return this.http.get<Examens>(url, { headers });
  }

    // List all laborantins for a specific hospital
    getLaborantins(hospitalId: string, page: number = 1): Observable<LaborantinListResponse> {
      const headers = this.getAuthHeaders();
      if (!headers) {
        throw new Error('Authorization failed');
      }
  
      const url = `${this.laborantinURL}${hospitalId}/laborantins/?page=${page}`;
      return this.http.get<LaborantinListResponse>(url, { headers });
    }

      // List all radiologists for a specific hospital
  getRadiologues(hospitalId: string, page: number = 1): Observable<RadiologueListResponse> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      throw new Error('Authorization failed');
    }

    const url = `${this.laborantinURL}${hospitalId}/radiologues/?page=${page}`;
    return this.http.get<RadiologueListResponse>(url, { headers });
  
  }

  // get infermiers 
  getInfermiers(hospitalID: string, page: number = 1): Observable<{ count: number; next: string | null; previous: string | null; results: InfermierList[] } | null> {
    const headers = this.getAuthHeaders();
    
    // If headers are not found, return an observable of null
    if (!headers) {
      return of(null);
    }
  
    // Construct the URL with pagination
    const url = `http://localhost:8000/api/medecin/hospital/${hospitalID}/infermiers/?page=${page}`;
  
    // Make the HTTP GET request and return the observable
    return this.http.get<{ count: number; next: string | null; previous: string | null; results: InfermierList[] }>(url, { headers })
      .pipe(
        catchError(() => of(null)) 
      );
  }
  


  // get dossize 
  getDossierMedicalDetail(type: string, id: string): Observable<DossierMedicalDetail> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      throw new Error('Authorization failed');
    } 

    const url = `${this.searchURL}${type}/${id}/`;

    return this.http.get< DossierMedicalDetail  >(url, { headers });
  }


  createActiviteInfermier(data: ActiviteInfermierCreate): Observable<ActiviteInfermierCreate |null> {
    const headers = this.getAuthHeaders()
    if (headers) {
      
      return this.http.post<ActiviteInfermierCreate>(this.baseUrl, data , {headers : headers});
    }else {
      return of(null)
    }

  }
}
