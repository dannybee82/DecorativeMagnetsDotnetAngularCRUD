import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fullscreen } from './fullscreen';
import { describe, beforeEach, it, expect } from 'vitest';

describe('FullscreenComponent', () => {
  let component: Fullscreen;
  let fixture: ComponentFixture<Fullscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fullscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fullscreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});