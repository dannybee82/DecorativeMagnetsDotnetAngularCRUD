import { TestBed } from '@angular/core/testing';
import { OpenFiles } from './open-files';
import { describe, beforeEach, it, expect } from 'vitest';

describe('OpenFilesService', () => {
  let service: OpenFiles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFiles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});