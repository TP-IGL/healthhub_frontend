import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeModalComponent } from './qrcode-modal.component';

describe('QrcodeModalComponent', () => {
  let component: QrcodeModalComponent;
  let fixture: ComponentFixture<QrcodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
