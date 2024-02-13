import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroComponentsComponent } from './pomodoro-components.component';

describe('PomodoroComponentsComponent', () => {
  let component: PomodoroComponentsComponent;
  let fixture: ComponentFixture<PomodoroComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomodoroComponentsComponent]
    });
    fixture = TestBed.createComponent(PomodoroComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
