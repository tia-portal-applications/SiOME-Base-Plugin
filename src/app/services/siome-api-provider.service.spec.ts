import { TestBed } from '@angular/core/testing';

import { SiomeApiProviderService } from './siome-api-provider.service';

describe('SiomeApiProviderService', () => {
  let service: SiomeApiProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiomeApiProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
