import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOutstandComponent } from './video-outstand.component';

describe('VideoOutstandComponent', () => {
  let component: VideoOutstandComponent;
  let fixture: ComponentFixture<VideoOutstandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoOutstandComponent]
    });
    fixture = TestBed.createComponent(VideoOutstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
