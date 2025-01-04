import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauinfermierComponent } from './tableauinfermier.component';

describe('TableauinfermierComponent', () => {
  let component: TableauinfermierComponent;
  let fixture: ComponentFixture<TableauinfermierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauinfermierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauinfermierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
