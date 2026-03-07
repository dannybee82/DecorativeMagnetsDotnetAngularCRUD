import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullscreenComponent } from './fullscreen.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('FullscreenComponent', () => {
  let component: FullscreenComponent;
  let fixture: ComponentFixture<FullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});