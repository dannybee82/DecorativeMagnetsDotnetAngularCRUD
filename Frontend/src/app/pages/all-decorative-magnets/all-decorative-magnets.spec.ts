import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllDecorativeMagnets } from './all-decorative-magnets';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AllDecorativeMagnetsComponent', () => {
  let component: AllDecorativeMagnets;
  let fixture: ComponentFixture<AllDecorativeMagnets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDecorativeMagnets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDecorativeMagnets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});