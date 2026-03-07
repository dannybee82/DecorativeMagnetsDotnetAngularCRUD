import { TestBed } from '@angular/core/testing';
import { OpenFilesService } from './open-files.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('OpenFilesService', () => {
  let service: OpenFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});