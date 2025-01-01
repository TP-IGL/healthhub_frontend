import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-med-cards',
  imports: [],
  templateUrl: './med-cards.component.html',
  styleUrl: './med-cards.component.css'
})
export class MedCardsComponent {
  @Input() isSidebarOpen  : boolean  = false
  @Input() numPatients : number | undefined = 0
  @Input() numRendezVous : number | undefined = 0 
  @Input() numOrdanace : number | undefined = 0
}
