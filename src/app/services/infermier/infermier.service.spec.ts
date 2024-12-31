import { TestBed } from '@angular/core/testing';

import { InfermierService } from './infermier.service';

describe('InfermierService', () => {
  let service: InfermierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfermierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
