import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDecorativeMagnetComponent } from './details-decorative-magnet.component';

describe('DetailsDecorativeMagnetComponent', () => {
  let component: DetailsDecorativeMagnetComponent;
  let fixture: ComponentFixture<DetailsDecorativeMagnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDecorativeMagnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDecorativeMagnetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
