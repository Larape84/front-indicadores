import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaMedidaComponent } from './modal-nueva-medida.component';

describe('ModalNuevaMedidaComponent', () => {
  let component: ModalNuevaMedidaComponent;
  let fixture: ComponentFixture<ModalNuevaMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNuevaMedidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevaMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
