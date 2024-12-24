import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-modaldialog',
  imports: [],
  templateUrl: './modaldialog.component.html',
  styleUrl: './modaldialog.component.css'
})
export class ModaldialogComponent {


  @Output() confirmDelete = new EventEmitter<boolean>();

  // Method to show the modal (using the id of the modal)
  openModal(): void {
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  // Method to close the modal (using the id of the modal)
  closeModal(): void {
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  // Method to confirm the delete action
  confirm(): void {
    this.confirmDelete.emit(true);
    this.closeModal();
  }

  // Method to cancel the delete action
  cancel(): void {
    this.confirmDelete.emit(false);
    this.closeModal();
  }
}
