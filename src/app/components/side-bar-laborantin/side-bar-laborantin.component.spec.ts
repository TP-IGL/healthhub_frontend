import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarLaborantinComponent } from './side-bar-laborantin.component';

describe('SideBarLaborantinComponent', () => {
  let component: SideBarLaborantinComponent;
  let fixture: ComponentFixture<SideBarLaborantinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarLaborantinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarLaborantinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
