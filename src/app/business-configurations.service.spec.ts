import { TestBed } from '@angular/core/testing';

import { BusinessConfigurationsService } from './business-configurations.service';

describe('BusinessConfigurationsService', () => {
  let service: BusinessConfigurationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessConfigurationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
