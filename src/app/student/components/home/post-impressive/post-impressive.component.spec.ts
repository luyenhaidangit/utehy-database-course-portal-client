import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImpressiveComponent } from './post-impressive.component';

describe('PostImpressiveComponent', () => {
  let component: PostImpressiveComponent;
  let fixture: ComponentFixture<PostImpressiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostImpressiveComponent]
    });
    fixture = TestBed.createComponent(PostImpressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
