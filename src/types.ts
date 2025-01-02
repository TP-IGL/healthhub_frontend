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
  

  // medecin 
  export interface ConsultationCreateUpdate {
    consultationID: string; 
    patient_id: string; 
    dateConsultation?: string; 
    diagnostic: string;
    resume: string;
    status: 'planifie' | 'en_cours' | 'termine' | 'annule';
  }

  // consultation 
  export interface Consultations {
    consultationID: string;
    dateConsultation: string;
    diagnostic: string;
    resume: string;
    status: 'planifie' | 'en_cours' | 'termine' | 'annule';
    medecin_name: string;
    ordonnances: Ordonnances[];
    examens: Examens[];
    activites_infermier: ActiviteInfermier[];
  }
  
  export interface Ordonnances {
    ordonnanceID: string;
    valide: boolean;
    dateCreation: string;
    dateExpiration: string;
    medicaments: OrdonnancesMedicament[];
  }
  
  export interface OrdonnancesMedicament {
    ordonnanceMedicamentID: string;
    medicament: Medicaments;
    duree: string;
    dosage: 'faible' | 'moyen' | 'fort';
    frequence: string;
    instructions: string;
  }
  
  export interface Medicaments {
    medicamentID: string;
    nom: string;
    type: 'comprime' | 'sirop' | 'injection' | 'pommade' | 'autre';
    description: string;
  }
  
  export interface Examens {
    examenID: string;
    type: 'labo' | 'radio';
    doctor_details: string | null;
    medecin_name: string;
    createdAt: string;
    etat: 'planifie' | 'en_cours' | 'termine' | 'annule';
    priorite: 'normal' | 'urgent' | 'tres_urgent';
    resultat_labo: ResultatLabo[];
    resultat_radio: ResultatsRadio[];
  }
  
  export interface ResultatLabo {
    resLaboID: string;
    laboratin_name: string;
    laboratin_specialite: string;
    resultat: string;
    dateAnalyse: string;
    status: 'en_cours' | 'termine' | 'valide';
    health_metrics : HealthMetrics[] ; 
  }
  export interface HealthMetrics {
    id : string ; 
    metric_type : 'temperature'| 'pression_arterielle'| 'glycemie' |'autre' ; 
    value : string ;
    unit : string ;
    measured_at : string
  }
  export interface ResultatsRadio {
    resRadioID: string;
    radiologue_name: string;
    radiologue_specialite: string;
    radioImgURL: string | null;
    type: 'radiographie' | 'echographie' | 'scanner' | 'irm';
    rapport: string;
    dateRealisation: string;
  }
  
  export interface ActiviteInfermier {
    id: string;
    infermier_name: string;
    typeActivite: 'administration_medicament' | 'soins' | 'observation' | 'prelevement' | 'autre';
    doctors_details: string;
    nurse_observations: string;
    createdAt: string;
    status: 'planifie' | 'en_cours' | 'termine';
  }

  export interface ExaminationCreate {
    type: 'labo' | 'radio';  
    priorite: 'normal' | 'urgent' | 'tres_urgent';  
    doctor_details?: string | null;  
    radiologue_id: string;  
    laborantin_id: string;  
  }

  export interface OrdonnanceMedicamentCreate {
    medicament_id: string; 
    duree: string; 
    dosage: 'faible' | 'moyen' | 'fort';  
    frequence: string;
    instructions: string;  
  }
  
  export interface OrdonnanceCreate {
    dateExpiration: string;  
    medicaments: OrdonnanceMedicamentCreate[];  
  }

  export interface Ordonnances {
    ordonnanceID: string;  
    valide: boolean; 
    dateCreation: string;  
    dateExpiration: string;  
    medicaments: OrdonnancesMedicament[]; 
  }
  
  export interface OrdonnancesListResponse {
    count: number;  
    next: string | null;  
    previous: string | null;  
    results: Ordonnances[];  
  }
  export interface Medecin {
    id: string; 
    nom: string; 
    prenom: string; 
  }
  
  export interface CentresHospitalier {
    id: string; 
    nom: string; 
    adresse: string; 
  }
  
  export interface Patients {
    NSS: string; 
    nom: string; 
    prenom: string; 
    dateNaissance: string; 
    adresse: string; 
    telephone: string; 
    mutuelle: string; 
    contactUrgence: string;
    medecin: Medecin; 
    centre_hospitalier: CentresHospitalier;
    createdAt: string; } 
  export interface PatientsListResponse {
    count: number;
    next: string | null; 
    previous: string | null; 
    results: Patients[]; 
  }


  // labs
  export interface LaborantinListResponse {
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: LaborantinList[]; 
  }
  
  export interface LaborantinList {
    user_id: string;
    name: string;
    specialite: 'biochimie' | 'hematologie' | 'microbiologie' | 'autre';
    shift: 'jour' | 'nuit' | 'rotation'; 
    nombreTests: number;
  }

  // radiologue 
  export interface RadiologueListResponse {
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: RadiologueList[]; 
  }
  
  export interface RadiologueList {
    user_id: string; 
    name: string;
    specialite: 'radiographie' | 'echographie' | 'scanner' | 'irm'; 
    shift: 'jour' | 'nuit' | 'rotation'; 
    nombreTests: number; 
  }


  // medical  dossier 

  export interface	DossierMedicalDetail {
    patient : Patients ; 
    createdAt : string ; 
    active : boolean ; 
    consultations : Consultations[]
  }

  export interface UserResponse1 {
    count: number;
    next: string | null;   // next page URL or null if no next page
    previous: string | null; // previous page URL or null if no previous page
    results: any[];  // Array of user objects (you can define a more specific type here)
  }



  // users response 
  export interface UsersResponseFront {
    count: number ; 
    next : string | null  ;
    results : AdminUser[]
  }

  export interface medFront {
    centreHospitalier: number ;
    email: string | null ;
    id:string ;
    role:string ;
    username: string 
  }

  export interface UsersByDoctor {
    count: number ; 
    next : string | null  ;
    results : Patients[]
  }

  export interface Consultation {
    date: string ; 
    medicine: string ; 
    nss: string ; 
    status: string ; 
  }

  // medication Input 
  export interface MedicationInput {
    nom : string ; 
    type : "comprime"|"sirop"|"injection"|"pommade"|"autre" ; 
    description : string ; 
    dosage : "faible" |"moyen" | "fort"  ; 
    duree : string ; 
    frequence : string ; 
    instructions : string ;
  }

  // ordanance 
  export interface prescriptionsResponse {
    ordonnanceID : string ; 
    valid : boolean ; 
    dateCreation : string ; 
    dateExpiration : string | null ; 
    medicaments : medicaments2[]
  }
  export interface MedicamentsResposne {
    ordonnanceMedicamentID : string ; 
    medicament : medicaments3
  }
  export interface medicaments3 {
    medicamentID : string
    nom : string ; 
    type : string ; 
    description : string ;
  }
  interface medicaments2 {
    medicament : MedicamentsResposne ; 
    duree : string ; 
    dosage : string ; 
    frequence : string ; 
    instructions : string ;
  }


  // labs interfaces
  export interface ExamRequired {
    examenID : string  ; 
    consultation : string ; 
    patient : string ; 
    patient_id : string ; 
    type : string ; 
    etat : string ; 
    priorite : string ; 
    doctor_details : string ; 
    createdAt : string ; 
    health_metrics : string ; 
    nss : string 
  } 

  export interface ResultatLaboHistory {
    resLaboID : string ; 
    examenID : string ; 
    examen_type : string ; 
    resultat : string ; 
    dateAnalyse : string ; 
    status : "en_cours" | "termine" | "valide" ; 
    health_metrics : HealthMetrics[]
  }

  export interface ResultatLaboCreate {
    examen : string ;
    resultat : string ; 
    status : "en_cours" | "termine" | "valide" ; 
    health_metrics : healthMetricsCreate[]
  } 
  export interface healthMetricsCreate {
    metric_type : "pression_arterielle" | "glycemie" |"niveaux_cholesterol" | "autre" ; 
    value : string ; 
    unit : string
  }


