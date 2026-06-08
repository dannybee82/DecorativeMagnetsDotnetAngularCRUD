import { TestBed } from '@angular/core/testing';
import { Toast } from './toast';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ToastService', () => {
  let service: Toast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});