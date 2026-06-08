import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toastr } from './toastr';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ToastComponent', () => {
  let component: Toastr;
  let fixture: ComponentFixture<Toastr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toastr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toastr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});