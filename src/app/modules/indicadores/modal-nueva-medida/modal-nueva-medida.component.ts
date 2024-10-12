import { Component } from '@angular/core';
import { SharedmoduleModule } from '../../../../shared/modules/sharedmodule.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-nueva-medida',
  standalone: true,
  imports: [SharedmoduleModule],
  templateUrl: './modal-nueva-medida.component.html',
  styleUrl: './modal-nueva-medida.component.css'
})
export class ModalNuevaMedidaComponent {


  constructor(
    private modalService: MatDialogRef<ModalNuevaMedidaComponent>

  ){}


  public cerrarModal(): void{


    this.modalService.close()

  }

}
