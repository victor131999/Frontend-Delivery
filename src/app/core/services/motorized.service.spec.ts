import { TestBed } from '@angular/core/testing';

import { MotorizedService } from './motorized.service';

describe('MotorizedService', () => {
  let service: MotorizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
