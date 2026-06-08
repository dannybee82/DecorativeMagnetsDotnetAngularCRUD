import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsDecorativeMagnet } from './details-decorative-magnet';
import { describe, beforeEach, it, expect } from 'vitest';

describe('DetailsDecorativeMagnetComponent', () => {
  let component: DetailsDecorativeMagnet;
  let fixture: ComponentFixture<DetailsDecorativeMagnet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDecorativeMagnet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDecorativeMagnet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});