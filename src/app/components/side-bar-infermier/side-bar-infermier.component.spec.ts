import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarInfermierComponent } from './side-bar-infermier.component';

describe('SideBarInfermierComponent', () => {
  let component: SideBarInfermierComponent;
  let fixture: ComponentFixture<SideBarInfermierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarInfermierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarInfermierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
