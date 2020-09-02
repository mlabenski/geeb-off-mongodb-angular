import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaviconAnimationComponent } from './favicon-animation.component';

describe('FaviconAnimationComponent', () => {
  let component: FaviconAnimationComponent;
  let fixture: ComponentFixture<FaviconAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaviconAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaviconAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
