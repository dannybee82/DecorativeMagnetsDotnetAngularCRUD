import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { beforeEach, describe, expect, it } from "Vitest";

describe('ScrollToTopAdminComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ScrollToTopComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});