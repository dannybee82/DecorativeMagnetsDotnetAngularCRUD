import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButton } from './back-button';
import { describe, beforeEach, it, expect } from 'vitest';

describe('BackButtonComponent', () => {
  let component: BackButton;
  let fixture: ComponentFixture<BackButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});