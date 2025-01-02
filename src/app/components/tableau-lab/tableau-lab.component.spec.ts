import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauLabComponent } from './tableau-lab.component';

describe('TableauLabComponent', () => {
  let component: TableauLabComponent;
  let fixture: ComponentFixture<TableauLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
