import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Rendezvous, TableaurdvComponent } from '../../components/tableaurdv/tableaurdv.component'
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { SideBarMedecinComponent } from '../../components/side-bar-medecin/side-bar-medecin.component';
import { jsPDF } from 'jspdf'
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-rapports',
  imports: [CommonModule, ModaldialogComponent, SideBarMedecinComponent,FormsModule],
  templateUrl: './rapports.component.html',
  styleUrl: './rapports.component.css'
})
export class RapportsComponent {
    /*******************************************SIDEBARRRRR*********************** */
  isSidebarOpen :boolean=false;
  

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }



  selectedMenu = 'Rapports'; // État pour suivre le menu actif

  constructor(private router: Router) {} 

  activeItem: string = 'Rapports';
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

/********************************************************************************************* */
/*newPrescription = {
  patientName: '',
  date: '',
  medicines: ''
};

pdfFiles: PdfFile[] = [];

generatePrescription(): void {
  const doc = new jsPDF();

  // En-tête de l'ordonnance
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Ordonnance Médicale', 20, 20);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nom du Patient : ${this.newPrescription.patientName}`, 20, 40);
  doc.text(`Date : ${this.newPrescription.date}`, 20, 50);

  // Médicaments
  doc.text('Médicaments et Doses :', 20, 70);
  const medicines = this.newPrescription.medicines.split(',').map((med, i) => `${i + 1}. ${med.trim()}`);
  doc.text(medicines.join('\n'), 20, 80);

  // Footer ou signature
  doc.text('____________________', 20, 200);
  doc.text('Signature du Médecin', 20, 210);

  // Génération et ajout au tableau des fichiers PDF
  const filename = `Ordonnance_${this.newPrescription.patientName}_${this.newPrescription.date}.pdf`;
  const fileBlob = doc.output('blob');
  const fileUrl = URL.createObjectURL(fileBlob);

  this.pdfFiles.push({
    id: Date.now(),
    filename,
    url: fileUrl,
    patientName: this.newPrescription.patientName,
    date: this.newPrescription.date,
    selected: false
  });

  // Réinitialiser le formulaire
  this.newPrescription = { patientName: '', date: '', medicines: '' };
}
downloadFile(pdf: PdfFile): void {
  const a = document.createElement('a');
  a.href = pdf.url;
  a.download = pdf.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}*/
// Liste des ordonnances


}


