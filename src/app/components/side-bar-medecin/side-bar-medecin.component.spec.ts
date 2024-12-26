import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMedecinComponent } from './side-bar-medecin.component';

describe('SideBarMedecinComponent', () => {
  let component: SideBarMedecinComponent;
  let fixture: ComponentFixture<SideBarMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarMedecinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
