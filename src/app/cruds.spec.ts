import { TestBed } from '@angular/core/testing';

import { Cruds } from './cruds';

describe('Cruds', () => {
  let service: Cruds;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cruds);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
