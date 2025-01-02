import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamslabDetailsComponent } from './examslab-details.component';

describe('ExamslabDetailsComponent', () => {
  let component: ExamslabDetailsComponent;
  let fixture: ComponentFixture<ExamslabDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamslabDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamslabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
