import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarLaborantinComponent } from '../../components/side-bar-laborantin/side-bar-laborantin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LabService } from '../../services/labs/lab.service';
import { 
  Examens, 
  ExamRequired, 
  healthMetricsCreate, 
  ResultatLabo, 
  ResultatLaboCreate, 
  ResultatLaboHistory,
  HealthMetrics 
} from '../../../types';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-examslab-details',
  imports: [SideBarLaborantinComponent, CommonModule, FormsModule],
  templateUrl: './examslab-details.component.html',
  styleUrl: './examslab-details.component.css',
  standalone: true
})
export class ExamslabDetailsComponent implements OnInit, AfterViewInit {
  // Chart references
  @ViewChild('pressureChart') pressureChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cholesterolChart') cholesterolChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('glucoseChart') glucoseChart!: ElementRef<HTMLCanvasElement>;

  // Chart instances
  private pressureChartInstance: Chart | null = null;
  private cholesterolChartInstance: Chart | null = null;
  private glucoseChartInstance: Chart | null = null;

  // Synchronization flags
  private isDataLoaded = false;
  private canvasesReady = false;

  // Component state
  modalDialog: any;
  isSidebarOpen: boolean = false;
  laboname: string = 'Said';
  selectedMenu = 'Examens';
  activeItem: string = 'Examens';
  showPopup = false;
  currentResult: any = {};
  isSubmitting: boolean = false;

  // Data properties
  ResultLabo: ResultatLabo[] | null = null;
  examId: string | null = '';
  exam: Examens | null = null;
  healthMetrics: HealthMetrics | null = null;
  nss: string | null = null;
  exams: ResultatLaboHistory[] = [];
  filteredExams: ResultatLaboHistory[] = [];

  // Metrics configuration
  newMetrics = [
    { metric_type: 'pression_arterielle', value: '', unit: '' },
    { metric_type: 'glycemie', value: '', unit: '' },
    { metric_type: 'niveaux_cholesterol', value: '', unit: '' }
  ];

  metrics: healthMetricsCreate[] = [
    { metric_type: "autre", value: '', unit: '' }
  ];

  metricTypes = ['pression_arterielle', 'glycemie', 'niveaux_cholesterol', 'autre'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private laboService: LabService
  ) {}

  ngOnInit(): void {
    this.initializeRouteParams();
  }

  private initializeRouteParams(): void {
    this.examId = this.route.snapshot.paramMap.get('id');
    this.nss = this.route.snapshot.paramMap.get('nss');

    if (this.examId) {
      this.loadExamination();
    }
    if (this.nss) {
      this.fetchUserExams(1, this.nss);
    }
  }

  private loadExamination(): void {
    this.laboService.getExaminationById(this.examId!).subscribe({
      next: (result: Examens) => {
        this.exam = result;
        this.ResultLabo = result.resultat_labo;
      },
      error: (error) => console.error('Error loading examination:', error)
    });
  }

  fetchUserExams(page: number, nss: string): void {
    this.laboService.getPatientHistory(nss, page).subscribe({
      next: (response) => {
        if (response) {
          this.exams = [...this.exams, ...response.results];
          if (response.next) {
            const nextPage = this.getPageNumberFromUrl(response.next);
            this.fetchUserExams(nextPage, nss);
          } else {
            this.filteredExams = [...this.exams];
            this.isDataLoaded = true;
            this.initChartsIfReady();
          }
        }
      },
      error: (err) => {
        console.error('Error fetching exams:', err);
        this.isDataLoaded = true;
      }
    });
  }

  ngAfterViewInit() {
    this.canvasesReady = true;
    this.initChartsIfReady();
  }

  private initChartsIfReady(): void {
    if (!this.isDataLoaded || !this.canvasesReady) {
      return;
    }

    const pressureCanvas = this.pressureChart?.nativeElement;
    const cholesterolCanvas = this.cholesterolChart?.nativeElement;
    const glucoseCanvas = this.glucoseChart?.nativeElement;

    this.clearExistingCharts();

    if (pressureCanvas && cholesterolCanvas && glucoseCanvas) {
      this.initChart(pressureCanvas, 'Pression artérielle (mmHg)', 'pression_arterielle');
      this.initChart(cholesterolCanvas, 'Niveaux de Cholestérol (mg/dL)', 'niveaux_cholesterol');
      this.initChart(glucoseCanvas, 'Niveaux de Glucose (mg/dL)', 'glucose');
    }
  }

  private clearExistingCharts(): void {
    if (this.pressureChartInstance) {
      this.pressureChartInstance.destroy();
      this.pressureChartInstance = null;
    }
    if (this.cholesterolChartInstance) {
      this.cholesterolChartInstance.destroy();
      this.cholesterolChartInstance = null;
    }
    if (this.glucoseChartInstance) {
      this.glucoseChartInstance.destroy();
      this.glucoseChartInstance = null;
    }
  }

  

  initChart(ctx: HTMLCanvasElement, label: string, metricType: string) {
    const filteredResults = this.exams.filter(result =>
      result.health_metrics.some(metric => metric.metric_type === metricType)
    );

    const labels = filteredResults.map(result => new Date(result.dateAnalyse).toLocaleString());
    const data = filteredResults.map(result => {
      const value = result.health_metrics.find(metric => 
        metric.metric_type === metricType
      )?.value;
      return typeof value === 'string' ? parseFloat(value) : value || 0;
    });

    const chartData: ChartData<'bar'> = {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    };

    const chartConfig:ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: '#000',
            font: {
              weight: 'bold',
              size: 12
            },
            formatter: (value) => value.toString(),
            anchor: 'end',
            align: 'top',
          }
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              minRotation: 45,
              maxRotation: 90,
              padding: 10,
            }
          },
          y: {
            title: {
              display: true,
              text: label
            },
            beginAtZero: true,
          }
        }
      }
    };

    const chart = new Chart(ctx, chartConfig);
    this.assignChartInstance(metricType, chart);
  }



  private assignChartInstance(metricType: string, chart: Chart): void {
    switch (metricType) {
      case 'pression_arterielle':
        this.pressureChartInstance = chart;
        break;
      case 'niveaux_cholesterol':
        this.cholesterolChartInstance = chart;
        break;
      case 'glucose':
        this.glucoseChartInstance = chart;
        break;
    }
  }


  updateChart(chartInstance: Chart | null, newData: number[], newLabels: string[]) {
    if (chartInstance) {
      chartInstance.data.labels = newLabels;
      chartInstance.data.datasets[0].data = newData;
      chartInstance.update();
    }
  }

  // Sidebar and Menu functions
  toggleSidebar(isExpanded: boolean) {
    this.isSidebarOpen = !isExpanded;
  }

  onMenuSelect(menu: string) {
    this.selectedMenu = menu;
    this.activeItem = menu;

    if (menu === 'Examens') {
      this.router.navigate(['laborantin']);
    }
  }

  // Popup related functions
  openPopup(result: any) {
    this.currentResult = result;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  saveMetrics() {
    for (const metric of this.newMetrics) {
      this.currentResult.health_metrics.push({ ...metric });
    }
    this.currentResult.status = 'termine';
    
    this.newMetrics.forEach(metric => {
      metric.value = '';
      metric.unit = '';
    });

    console.log('Metrics ajoutées', this.currentResult);
    this.closePopup();
  }

  // Metric management functions
  addMetric() {
    this.metrics.push({ metric_type: 'autre', value: '', unit: '' });
  }

  removeMetric(index: number) {
    this.metrics.splice(index, 1);
  }

  submitMetrics() {
    if (!this.validateMetrics()) {
      return;
    }

    if (!this.examId) {
      console.error('No exam ID available');
      return;
    }

    const data: ResultatLaboCreate = {
      examen: this.examId,
      health_metrics: this.metrics,
      status: "termine",
      resultat: "results"
    };

    this.isSubmitting = true;
    this.laboService.submitTest(data).subscribe({
      next: this.handleSubmitSuccess.bind(this),
      error: this.handleSubmitError.bind(this)
    });
  }

  private validateMetrics(): boolean {
    return this.metrics.every(metric => {
      if (!this.metricTypes.includes(metric.metric_type)) {
        alert(`Invalid metric type: ${metric.metric_type}`);
        return false;
      }
      if (!metric.value || isNaN(parseFloat(metric.value))) {
        alert('Each metric must have a valid numeric value.');
        return false;
      }
      if (!metric.unit || metric.unit.length < 1 || metric.unit.length > 50) {
        alert('Each unit must be between 1 and 50 characters.');
        return false;
      }
      return true;
    });
  }

  private handleSubmitSuccess(response: any): void {
    console.log('Submission successful:', response);
    this.isSubmitting = false;
    alert('Metrics submitted successfully!');
  }

  private handleSubmitError(error: any): void {
    console.error('Error submitting metrics:', error);
    this.isSubmitting = false;
    alert('Failed to submit metrics. Please try again.');
  }

  // Utility functions
  private getPageNumberFromUrl(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }
}