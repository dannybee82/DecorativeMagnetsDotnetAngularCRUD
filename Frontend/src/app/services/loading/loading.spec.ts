import { TestBed } from '@angular/core/testing';
import { Loading } from './loading';
import { describe, beforeEach, it, expect } from 'vitest';

describe('LoadingService', () => {
  let service: Loading;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loading);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});