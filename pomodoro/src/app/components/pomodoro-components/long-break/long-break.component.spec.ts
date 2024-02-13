import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongBreakComponent } from './long-break.component';

describe('LongBreakComponent', () => {
  let component: LongBreakComponent;
  let fixture: ComponentFixture<LongBreakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LongBreakComponent]
    });
    fixture = TestBed.createComponent(LongBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
