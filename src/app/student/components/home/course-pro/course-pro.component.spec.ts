import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProComponent } from './course-pro.component';

describe('CourseProComponent', () => {
  let component: CourseProComponent;
  let fixture: ComponentFixture<CourseProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseProComponent]
    });
    fixture = TestBed.createComponent(CourseProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
