import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-med-cards',
  imports: [],
  templateUrl: './med-cards.component.html',
  styleUrl: './med-cards.component.css'
})
export class MedCardsComponent {
  @Input() isSidebarOpen  : boolean  = false

}
