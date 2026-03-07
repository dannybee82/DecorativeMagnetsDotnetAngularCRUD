import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortAlphabeticallyComponent } from './sort-alphabetically.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('SortAlphabeticallyComponent', () => {
  let component: SortAlphabeticallyComponent;
  let fixture: ComponentFixture<SortAlphabeticallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAlphabeticallyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAlphabeticallyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
