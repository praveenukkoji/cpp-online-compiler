import { TestBed } from '@angular/core/testing';

import { ExecuteService } from './execute.service';

describe('ExecuteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecuteService = TestBed.get(ExecuteService);
    expect(service).toBeTruthy();
  });
});
