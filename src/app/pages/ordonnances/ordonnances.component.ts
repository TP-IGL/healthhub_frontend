import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Rendezvous, TableaurdvComponent } from '../../components/tableaurdv/tableaurdv.component'
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';
import { jsPDF } from 'jspdf'
import { FormsModule } from '@angular/forms';


interface PdfFile {
  id: number;
  filename: string;
  url: string;
  patientName: string;
  date: string;
  selected: boolean;
}
@Component({
  selector: 'app-ordonnances',
  imports: [ CommonModule, ModaldialogComponent, SideBarMedecinComponent,FormsModule],
  templateUrl: './ordonnances.component.html',
  styleUrl: './ordonnances.component.css'
})
export class OrdonnancesComponent {
   

  /*******************************************SIDEBARRRRR*********************** */
  isSidebarOpen :boolean=false;
  

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }
   


  selectedMenu = 'Ordonnances'; // État pour suivre le menu actif

  constructor(private router: Router) {} 

   activeItem: string = 'Ordonnances';
  onMenuSelect(menu: string) {
    this.selectedMenu = menu;
    this.activeItem = menu;
    console.log(`Menu sélectionné : ${menu}`);

    // Navigation logique en fonction du menu sélectionné
    
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
  /******************************************PDF**************************** */
  pdfFiles: { id: number; filename: string; patientName: string; date: string; selected: boolean }[] = [];
  selectedFiles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  // Variables pour le modal
  showAddModal: boolean = false;
  editMode: boolean = false;
  editPdfId: number | null = null;
  editPdfPatient: string = '';
  editPdfAge: number | null = null;
  editPdfDate: string = '';
  editPdfConsultation: string = '';
  editPdfPrescriptions: string = '';
  
  totalPages(): number {
    return Math.ceil(this.pdfFiles.length/ this.itemsPerPage);
  }
  
  paginatedFiles(): any[] {
    const startIndex = (this.currentPage -1) * this.itemsPerPage;
    return this.pdfFiles.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  toggleSelection(pdf: PdfFile): void {
      pdf.selected = !pdf.selected; // Inverser l'état sélectionné
    
      if (pdf.selected) {
        // Ajouter à la liste des fichiers sélectionnés
        if (!this.selectedFiles.includes(pdf)) {
          this.selectedFiles.push(pdf);
        }
      } else {
        // Retirer de la liste des fichiers sélectionnés
        this.selectedFiles = this.selectedFiles.filter(file => file.id !== pdf.id);
      }
    }
  
    toggleSelectAll(event: any): void {
      const selectAll = event.target.checked; // Vérifier si la case "Tout sélectionner" est cochée
    
      this.pdfFiles.forEach(pdf => {
        pdf.selected = selectAll;
    
        if (selectAll) {
          // Ajouter tous les fichiers à la liste sélectionnée
          if (!this.selectedFiles.includes(pdf)) {
            this.selectedFiles.push(pdf);
            console.log("selectedFiles :",this.selectedFiles.length );
          }
        } else {
          // Vider la liste des fichiers sélectionnés si "Tout désélectionner"
          this.selectedFiles = [];
        }
      });
  }
  
  
  downloadSelectedFiles(): void {
    console.log("selectedFiles :",this.selectedFiles.length );
    if (this.selectedFiles.length === 0) {
      alert('Aucun fichier sélectionné pour le téléchargement.');
      return;
    }
  
    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        const blob = new Blob([event.target.result], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = file.filename; // Set the desired filename
  
        // Simulate click to trigger download
        link.click();
  
        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(url);
      };
  
      reader.readAsDataURL(file.url); // Assuming you have the file URL for download
    });
  
    this.selectedFiles = []; // Reset the selected files list
  }
  
  openAddModal(): void {
    this.showAddModal = true;
    this.resetForm();
  }
  
  closeAddModal(): void {
    this.showAddModal = false;
  }
  
  resetForm(): void {
    this.editMode = false;
    this.editPdfId = null;
    this.editPdfPatient = '';
    this.editPdfAge = null;
    this.editPdfDate = '';
    this.editPdfConsultation = '';
    this.editPdfPrescriptions = '';
  }
  
  editPdf(pdf: any): void {
    this.showAddModal = true;
    this.editMode = true;
    this.editPdfId = pdf.id;
    this.editPdfPatient = pdf.patientName;
    this.editPdfAge = pdf.age;
    this.editPdfDate = pdf.date;
    this.editPdfConsultation = pdf.consultationType;
    this.editPdfPrescriptions = pdf.prescriptions;
  }
  
  savePdf(): void {
    if (this.editMode) {
      // Update existing ordonnance
      const index = this.pdfFiles.findIndex(pdf => pdf.id === this.editPdfId);
      if (index !== -1) {
        this.pdfFiles[index] = {
          ...this.pdfFiles[index],
          patientName: this.editPdfPatient,
          date: this.editPdfDate,
          filename: `${this.editPdfPatient}_${this.editPdfDate}.pdf`
        };
      }
    } else {
      // Add new ordonnance
      const newPdf = {
        id: this.pdfFiles.length + 1,
        filename: `Ordonnance_${this.editPdfPatient}_${this.editPdfDate}.pdf`,
        patientName: this.editPdfPatient,
        date: this.editPdfDate,
        selected: false
      };
      this.pdfFiles.push(newPdf);
      //this.generatePdf(newPdf);
    }
  
    this.closeAddModal(); // Close the modal after saving
  }
  
  generatePdf(data: any): void {
    const doc = new jsPDF();
  
    // Ajouter les détails de l'ordonnance
    doc.setFontSize(16);
    doc.text('Ordonnance Médicale', 20, 20);
    doc.setFontSize(12);
    doc.text(`Nom du Patient : ${data.patientName}`, 20, 40);
    doc.text(`Âge : ${this.editPdfAge}`, 20, 50);
    doc.text(`Date : ${data.date}`, 20, 60);
    doc.text(`Type de Consultation : ${this.editPdfConsultation}`, 20, 70);
  
    // Ajouter les prescriptions
    doc.setFontSize(14);
    doc.text('Prescriptions :', 20, 90);
    doc.setFontSize(12);
    const lines = this.editPdfPrescriptions.split('\n');
    let y = 100;
    lines.forEach(line => {
      doc.text(line, 20, y);
      y += 10;
    });
  
    // Sauvegarder le fichier PDF
    const fileName = `Ordonnance_${data.patientName}_${data.date}.pdf`;
    doc.save(fileName);
  }
  
  deletePdf(id: number): void {
    this.pdfFiles = this.pdfFiles.filter(pdf => pdf.id !== id);
  }
}
