import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFreeComponent } from './course-free.component';

describe('CourseFreeComponent', () => {
  let component: CourseFreeComponent;
  let fixture: ComponentFixture<CourseFreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseFreeComponent]
    });
    fixture = TestBed.createComponent(CourseFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
