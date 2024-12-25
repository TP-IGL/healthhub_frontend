import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableaurdvComponent } from './tableaurdv.component';

describe('TableaurdvComponent', () => {
  let component: TableaurdvComponent;
  let fixture: ComponentFixture<TableaurdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableaurdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableaurdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
