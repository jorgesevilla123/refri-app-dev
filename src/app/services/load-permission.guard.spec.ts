import { TestBed } from '@angular/core/testing';

import { LoadPermissionGuard } from './load-permission.guard';

describe('LoadPermissionGuard', () => {
  let guard: LoadPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
