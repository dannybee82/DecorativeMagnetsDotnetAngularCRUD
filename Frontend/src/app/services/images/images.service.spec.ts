import { TestBed } from '@angular/core/testing';
import { ImagesService } from './images.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});