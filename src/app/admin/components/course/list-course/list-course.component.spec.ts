import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseComponent } from './list-course.component';

describe('ListCourseComponent', () => {
  let component: ListCourseComponent;
  let fixture: ComponentFixture<ListCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCourseComponent]
    });
    fixture = TestBed.createComponent(ListCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
