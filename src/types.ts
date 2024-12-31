export interface PatientCreate {
    username: string; 
    email: string; 
    password: string;
    NSS: number; 
    nom: string;
    prenom: string; 
    dateNaissance: string; 
    adresse: string;
    telephone: string; 
    mutuelle: string; 
    contactUrgence: string;
    medecin: string | null; 
    centreHospitalier: number; 
  }


  export interface AdminUserCreate {
    username: string;
    password: string;
    email?: string;
    role: string;
    centreHospitalier?: number | null;
  }



  export interface AdminUser {
    id: number;
    username: string; 
    email: string | null; 
    role: string; 
    centreHospitalier: string | null; 
  }
  
  export interface UserResponse {
    count: number; 
    next: string | null;
    previous: string | null; 
    results: AdminUser[]; 
  }
  

// infermirr
  export interface PatientNurse {
    id: number;
    name: string;
  }
  
  export interface NurseActivity {
    id: number;
    activityType: string;
    date: string;
  }
  
  export interface NurseActivityDetail {
    patient: PatientNurse;
    activities: any[];
    consultation: NurseActivity;
  }
  
  export interface NurseActivityResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NurseActivityDetail[];
  }

  export interface CompletedActivityResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      id: number;
      typeActivite: string;
      status: string;
      doctors_details: string;
      nurse_observations: string;
      createdAt: string;
    }[];
  }
  export interface ValidateActivite {
    nurse_observations: string;
    title: string; 
    maxLength: number; 
    minLength: number; 
  }


  // for radiology 
  export interface PatientSummary {
    nom : string ;
    prenom : string ;
    nss : string 
  }
  export interface RadiologueConsultationSummary {
    consultationID : string ; 
    dateConsultation : string ; 
    diagnostic : string ; 
    status : "planifie" | "en_cours" |"termine" | "annule" 
  }

  export interface 	RadiologueExamenSummary {
    examenID :string ; 
    type : "labo" | "radio" ; 
    doctor_details : string ; 
    createdAt : string 
  }
  export interface	ResultatRadio {
    resRadioID : string ; 
    radioImgURL : string ; 
    type : "radiographie" | "echographie" | "scanner" |"irm"; 
    rapport : string ; 
    examen : string 
  }
  export interface RadiologueExamenDetail {
    patient: PatientSummary;
    consultation: RadiologueConsultationSummary;
    examen: RadiologueExamenSummary;
    resultatRadio: ResultatRadio;
  }
  
  export interface RadiologueExamenResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RadiologueExamenDetail[];
  }
  