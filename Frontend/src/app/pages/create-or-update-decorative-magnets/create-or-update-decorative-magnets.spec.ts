import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrUpdateDecorativeMagnets } from './create-or-update-decorative-magnets';
import { describe, beforeEach, it, expect } from 'vitest';

describe('CreateOrUpdateDecorativeMagnetsComponent', () => {
  let component: CreateOrUpdateDecorativeMagnets;
  let fixture: ComponentFixture<CreateOrUpdateDecorativeMagnets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateDecorativeMagnets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateDecorativeMagnets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});