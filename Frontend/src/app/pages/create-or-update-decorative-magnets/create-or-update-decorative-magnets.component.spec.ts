import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDecorativeMagnetsComponent } from './create-or-update-decorative-magnets.component';

describe('CreateOrUpdateDecorativeMagnetsComponent', () => {
  let component: CreateOrUpdateDecorativeMagnetsComponent;
  let fixture: ComponentFixture<CreateOrUpdateDecorativeMagnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateDecorativeMagnetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateDecorativeMagnetsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
