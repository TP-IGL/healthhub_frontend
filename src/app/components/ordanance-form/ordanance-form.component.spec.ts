import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdananceFormComponent } from './ordanance-form.component';

describe('OrdananceFormComponent', () => {
  let component: OrdananceFormComponent;
  let fixture: ComponentFixture<OrdananceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdananceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdananceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
