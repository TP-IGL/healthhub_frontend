import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetaileComponent } from './patient-detaile.component';

describe('PatientDetaileComponent', () => {
  let component: PatientDetaileComponent;
  let fixture: ComponentFixture<PatientDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetaileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
