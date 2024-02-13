import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfiguracionesComponent } from './modal-configuraciones.component';

describe('ModalConfiguracionesComponent', () => {
  let component: ModalConfiguracionesComponent;
  let fixture: ComponentFixture<ModalConfiguracionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfiguracionesComponent]
    });
    fixture = TestBed.createComponent(ModalConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
