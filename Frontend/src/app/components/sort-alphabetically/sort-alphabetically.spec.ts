import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortAlphabetically } from './sort-alphabetically';
import { describe, beforeEach, it, expect } from 'vitest';

describe('SortAlphabeticallyComponent', () => {
  let component: SortAlphabetically;
  let fixture: ComponentFixture<SortAlphabetically>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAlphabetically]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAlphabetically);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
