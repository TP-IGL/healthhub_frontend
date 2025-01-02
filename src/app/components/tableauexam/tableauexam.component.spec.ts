import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauexamComponent } from './tableauexam.component';

describe('TableauexamComponent', () => {
  let component: TableauexamComponent;
  let fixture: ComponentFixture<TableauexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauexamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
