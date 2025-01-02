import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements AfterViewInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resize();
  }

  @Input() colors: string[] = ['#4CAF50', '#FFC107', '#F44336', '#2196F3']; // Couleurs par défaut
  @Input() data: number[] = [40, 30, 20, 10]; // Données par défaut
  @Input() height: number = 300; // Hauteur par défaut
  @Input() width: number = 300; // Largeur par défaut
  @Input() label: string = ''; // Pas de label par défaut
  @Input() labelColor: string = 'rgba(80,80,80,.8)';

  @ViewChild('chart', { static: false }) chart!: ElementRef<SVGElement>;
  @ViewChild('container', { static: false }) container!: ElementRef<HTMLDivElement>;

  private svg: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.resize();
    this.buildChart();
  }

  private buildChart(): void {
    if (!this.chart || !this.container) {
      console.error('Chart or container element is not defined.');
      return;
    }

    // Nettoyage de l'ancienne instance de SVG
    d3.select(this.chart.nativeElement).selectAll('*').remove();

    // Taille dynamique
    const container = this.container.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const radius = Math.min(width, height) / 2;

    // Création du conteneur SVG
    this.svg = d3
      .select(this.chart.nativeElement)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Définition des échelles et des arcs
    const color = d3.scaleOrdinal<number, string>(this.colors);
    const arc = d3
      .arc<any>()
      .innerRadius(radius * 0.6) // Ajustement des proportions du donut
      .outerRadius(radius * 0.9)
      .cornerRadius(5);
    const pie = d3
      .pie<number>()
      .value((d: any) => d)
      .sort(null);

    // Création des segments
    this.svg
      .selectAll('path')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', <any>arc)
      .attr('fill', (d: any, i: number) => color(i))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Ajout du label au centre
    if (this.label) {
      this.svg
        .append('text')
        .attr('alignment-baseline', 'middle')
        .attr('fill', this.labelColor)
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', 0)
        .text(this.label)
        .style('font-size', '1.5rem');
    }
  }

  private resize(): void {
    if (!this.container) {
      console.error('Container element is not defined.');
      return;
    }

    // Taille responsive
    const containerWidth = this.container.nativeElement.offsetWidth;
    const containerHeight = this.container.nativeElement.offsetHeight;

    this.width = containerWidth || 300; // Valeur par défaut si non définie
    this.height = containerHeight || 300;

    this.buildChart(); // Reconstruire le graphique lors du redimensionnement
  }
}
