import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListFreeComponent } from './course-list-free.component';

describe('CourseListFreeComponent', () => {
  let component: CourseListFreeComponent;
  let fixture: ComponentFixture<CourseListFreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListFreeComponent]
    });
    fixture = TestBed.createComponent(CourseListFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
