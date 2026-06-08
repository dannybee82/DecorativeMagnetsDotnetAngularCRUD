import { TestBed } from '@angular/core/testing';
import { Images } from './images';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ImagesService', () => {
  let service: Images;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Images);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});