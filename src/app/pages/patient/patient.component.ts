import { Component, AfterViewInit, ElementRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModaldialogComponent } from '../../components/modaldialog/modaldialog.component';
import { MatIconModule } from '@angular/material/icon';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Platform } from '@angular/cdk/platform';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-patient',
  imports: [MatIconModule, CommonModule, SideBarComponent, FormsModule, ModaldialogComponent,],
 
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements AfterViewInit {

  /*******************************************HEADERR********************************* */
  patient: any = {
    photo: 'assets/patientt.svg', // Chemin de l'image
    name: 'John Doe',
    phone: '+123456789',
    sms: '+123456789',
    gender: 'Masculin',
    location: 'Algeria, Annaba',
    birth : '13 Janv 1990',
    age: 32,
    socialSecurity: '123456789',
    weight: 70, // kg
    height: 175, // cm
    imc: 22.86, // Calculé par exemple
  };

  isSidebarOpen :boolean=false;
  modalDialog: any;

  toggleSidebar(isExpanded:boolean) {
    this.isSidebarOpen = !isExpanded;
  }


  showPhoneNumber: boolean = false;
  PhoneNumber(): void {
    this.showPhoneNumber = !this.showPhoneNumber;
  }
/********************************************************************************************************* */

  /**************************************HISTORIQUE****************************************************** */

  historique = [
    { id: 1, title: 'Consultation', date: 'Janvier 2024', ordonnance: 'Télécharger l\'ordonnance', rapport: 'Télécharger le rapport', },
    { id: 2, title: 'Suivi général', date: 'Février 2024', ordonnance: 'Télécharger l\'ordonnance', rapport: 'Télécharger le rapport',},
    { id: 3, title: 'Bilan de santé', date: 'Mars 2024', ordonnance: 'Télécharger l\'ordonnance', rapport: 'Télécharger le rapport', },
  ]














  /**************************************GRAPHIQUE****************************************************** */
  healthData = [
    { name: 'Glucose', value: 5.2, unit: 'mmol/L', color: '#FABE7A' },
    { name: 'Tension', value: 6.5, unit: 'mmHg', color: '#F6595C' },
    { name: 'Protéines', value: 12.8, unit: 'g/L', color: '#7661E2' },
    { name: 'Cholestérol', value:68, unit: 'mmol/L', color: '#F6866A' }
  ];
  
  
  
  
  @ViewChild('healthChart') healthChart!: ElementRef<HTMLCanvasElement>;
  private chart: any;

  /*constructor(private platform: Platform) {
    Chart.register(ChartDataLabels); // Enregistrer le plugin des données
  }*/
    constructor(private platform: Platform) {}
   
    ngAfterViewInit() {
      //if (isPlatformBrowser(this.platform)) {
        const canvasElement = this.healthChart.nativeElement;
        if (canvasElement) {
          this.initChart(canvasElement);
        }
      //}
    }
  
    initChart(ctx: HTMLCanvasElement) {
      // Récupérer les étiquettes, les valeurs et les couleurs à partir des données
      const labels = this.healthData.map(data => data.name);
      const values = this.healthData.map(data => data.value);
      const backgroundColors = this.healthData.map(data => data.color); // Utiliser les couleurs hexadécimales
  
      this.chart = new Chart(ctx, {
        type: 'bar', // Type du graphique : barre
        data: {
          labels: labels,
          datasets: [{
            label: 'Mesures de santé',
            data: values,
            backgroundColor: backgroundColors, // Couleurs de fond pour chaque barre
            borderColor: 'rgba(0, 0, 0, 0.1)', // Couleur des bordures (optionnelle)
            borderWidth: 1,
            borderRadius: 10, // Ajout du rayon de bordure pour arrondir les coins
          }]
        },
        options: {
          responsive: true,
          plugins: {
            // Affichage des valeurs au-dessus des barres
            datalabels: {
              color: '#000',
              font: {
                weight: 'bold',
                size: 12
              },
              formatter: (value: any) => value, // Afficher la valeur brute
              anchor: 'end',
              align: 'top',
            }
          },
          scales: {
            x: {
              beginAtZero: true, // Démarrer l'axe x à zéro
            },
            y: {
              display: false, // Masquer l'axe y
              grid: {
                display: false, // Masquer les grilles
              },
            }
          }
        }
      });
    }

  // Méthode pour mettre à jour dynamiquement les données
  updateChart(newData: any[]) {
    this.chart.data.labels = newData.map(data => data.name);
    this.chart.data.datasets[0].data = newData.map(data => data.value);
    this.chart.data.datasets[0].backgroundColor = newData.map(data => data.color);
    this.chart.update();
  }

/********************************************************************************************************* */
/********************************************RApports et radio****************************** */
examens = [
  { nom: 'Radiographie Thoracique', typeImagerie: 'Rayons X', date: '12 janvier 2024', telechargerLink: '/path/to/examen1' },
  { nom: 'IRM cérébrale', typeImagerie: 'Imagerie IRM', date: '20 février 2024', telechargerLink: '/path/to/examen2' },
  
];


rapports = [
  { nom: 'Rapport de suivi', date: '12 janvier 2024', fichierLink: '/path/to/rapport1' },
  { nom: 'Rapport de consultation', date: '20 février 2024', fichierLink: '/path/to/rapport2' },
  
];
}


