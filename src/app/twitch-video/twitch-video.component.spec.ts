import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchVideoComponent } from './twitch-video.component';

describe('TwitchVideoComponent', () => {
  let component: TwitchVideoComponent;
  let fixture: ComponentFixture<TwitchVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
