import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedCardsComponent } from "../../components/med-cards/med-cards.component";
import { SideBarMedecinComponent } from "../../components/side-bar-medecin/side-bar-medecin.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { MedecinService } from '../../services/medecin/medecin.service';
import { AuthState } from '../../services/auth/auth.reducer';
import { ActiviteInfermier, ActiviteInfermierCreate, ConsultationCreateUpdate, InfermierList, MedicationInput } from '../../../types';
import { OrdananceFormComponent } from "../../components/ordanance-form/ordanance-form.component";
import { ExaminationFormComponent } from "../../components/examination-form/examination-form.component";
interface Exams {
  type : string  , 
  state : string
}
@Component({
  selector: 'app-add-consultation',
  imports: [CommonModule, ReactiveFormsModule, SideBarMedecinComponent, OrdananceFormComponent, ExaminationFormComponent],
  templateUrl: './add-consultation.component.html',
  styleUrls: ['./add-consultation.component.css']
})
export class AddConsultationComponent {
  consultation : ConsultationCreateUpdate | null = null
  medName: string | null = "ahmed"; 
  private medID: string | null = null; 
  private authState: AuthState | null = null;
  isConsultationSubmitted: boolean = false;
  consultationForm: FormGroup; // FormGroup for the form
  isSidebarOpen: boolean = true;
  selectedMenu = 'Patients'; // State for the active menu
  activeItem: string = 'Patients';
  medications: MedicationInput[] = [];
  addOrd: boolean = false;
  activityInfermier : ActiviteInfermier| null= null ; 
  constructor(
    private router: Router,
    private medService: MedecinService,
    private fb: FormBuilder  , // FormBuilder for creating the form group
    private route: ActivatedRoute
  ) {
    const jsonData = localStorage.getItem('authState');
    if (jsonData) {
      try {
        this.authState = JSON.parse(jsonData);
        if (this.authState) {
          this.medName = this.authState?.username;
          this.medID = this.authState?.id;
        }
      } catch (error) {
        console.error('Error parsing auth state from localStorage:', error);
      }
    }
    
    // Initialize the FormGroup
    this.consultationForm = this.fb.group({
      dateConsultation: ['', Validators.required],
      diagnostic: ['', Validators.required],
      resume: [''],
      statut: ['planifie', Validators.required]
    });
        // Initialize the form
        this.infirmierActivityForm = this.fb.group({
          infermier: ['', Validators.required],
          typeActivite: ['', Validators.required],
          doctors_details: ['', [Validators.required, Validators.minLength(1)]],
          status: ['', Validators.required]})
  }
  patientId : string | null = null ;
  addEaxmination : boolean = false
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.patientId = this.route.snapshot.paramMap.get('patientID');
    this.fetchAllUsers(1)
  }
  toggleSidebar(expand: boolean) {
    this.isSidebarOpen = expand;
  }

  onMenuSelect(menu: string) {
    this.selectedMenu = menu;
    this.activeItem = menu;
    console.log(`Menu sélectionné : ${menu}`);

    switch (menu) {
      case 'Patients':
        this.router.navigate(['medecin/:id/patients']);
        break;
      case 'Rendez-vous':
        this.router.navigate(['medecin/rendezvous']);
        break;
      case 'Ordonnances':
        this.router.navigate(['medecin/ordonnances']);
        break;
      case 'Rapports':
        this.router.navigate(['medecin/rapports']);
        break;
      default:
        console.warn('Menu inconnu');
    }
  }

  handleMedications(medications: MedicationInput[]) {
    this.medications = medications;
  }

  toggleAddOrd(): void {
    this.addOrd = !this.addOrd;
  }

  onSubmit(): void {
    if (this.consultationForm.valid && this.patientId) {
      // Log form data
      console.log('Consultation Data:', this.consultationForm.value);
  
      // Extract values from the form
      const { diagnostic, resume, statut } = this.consultationForm.value;
      let status = statut
      // Call the service to create the consultation
      let nss: string | null = this.patientId;
      this.medService.createConsultation({ nss, diagnostic, resume, status }).subscribe(
        (response) => {
          console.log('Consultation created successfully:', response);
          this.consultation = response
          this.isConsultationSubmitted = true;
        },
        (error) => {
          console.error('Error creating consultation:', error);
          alert('An error occurred while creating the consultation. Please try again.');
        }
      );
    } else {
      alert('Form is invalid. Please fill out all required fields.');
    }
  }
  toggleExamination() {
    this.addEaxmination = !this.addEaxmination
  }
  exams: Exams[] = []
  getExams(exam : Exams) {
    this.exams.push(exam)
  }
  

    // Define the form for infirmier activity
    infirmierActivityForm: FormGroup;
    isInfirmierActivitySubmitted = false;
      // Handle form submission for infirmier activity
  onInfirmierActivitySubmit() {
    if (this.infirmierActivityForm.valid && this.consultation) {
      const formValues = this.infirmierActivityForm.value;
      const data : ActiviteInfermierCreate = {
        consultation : this.consultation?.consultationID , 
        infermier : formValues.infermier , 
        typeActivite : formValues.typeActivite ,
        doctors_details : formValues.doctors_details , 
        status : formValues.status
      }
      this.medService.createActiviteInfermier(data).subscribe(
        {
          next : (response)=>{
            if (response) {
              alert("activity assigned")
            }else {
              alert("try again")
            }
          },
          error : (err) =>{
            alert("error accurs")
          }
        }
      )
      this.isInfirmierActivitySubmitted = true;
      // Perform further actions, e.g., save data or notify the user
    }
  }
  results : InfermierList[] = []
  infermiers : InfermierList[] = []
  fetchAllUsers(page: number): void {
    this.medService.getInfermiers('1',page).subscribe({
      next: (users) => {
        if (users) {
          // Append current page results
          this.results = [...this.results, ...users.results];
          // If there is a next page, recursively fetch the next page
          if (users.next) {
            const nextPage = this.getPageNumberFromUrl(users.next);
            this.fetchAllUsers(nextPage); // Recursive call to fetch the next page
          } else {
            // All pages are fetched, you can log or do something with the results
            // If needed, filter users by role here
            this.infermiers = [...this.results];
            console.log(this.infermiers)
          }
        } else {
          console.log('No users found or an error occurred.');
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  // Helper method to extract the page number from the "next" URL
  getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);  // Extract the page number from the URL
    return match ? parseInt(match[1], 10) : 1;  // Return the page number or 1 if not found
  }

}
