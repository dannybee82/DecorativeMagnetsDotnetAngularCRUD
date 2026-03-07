import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllDecorativeMagnetsComponent } from './all-decorative-magnets.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AllDecorativeMagnetsComponent', () => {
  let component: AllDecorativeMagnetsComponent;
  let fixture: ComponentFixture<AllDecorativeMagnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDecorativeMagnetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDecorativeMagnetsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});