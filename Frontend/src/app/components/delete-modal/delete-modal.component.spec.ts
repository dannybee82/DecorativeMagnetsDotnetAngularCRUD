import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteModalComponent } from './delete-modal.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});