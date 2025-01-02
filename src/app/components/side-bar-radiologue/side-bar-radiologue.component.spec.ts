import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarRadiologueComponent } from './side-bar-radiologue.component';

describe('SideBarRadiologueComponent', () => {
  let component: SideBarRadiologueComponent;
  let fixture: ComponentFixture<SideBarRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
