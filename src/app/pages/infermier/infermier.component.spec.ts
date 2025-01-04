import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfermierComponent } from './infermier.component';

describe('InfermierComponent', () => {
  let component: InfermierComponent;
  let fixture: ComponentFixture<InfermierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfermierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfermierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
