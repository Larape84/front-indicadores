import { Component, Inject, OnInit } from '@angular/core';
import { SharedmoduleModule } from '../../../../shared/modules/sharedmodule.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-nueva-medida',
  standalone: true,
  imports: [SharedmoduleModule],
  templateUrl: './modal-nueva-medida.component.html',
  styleUrl: './modal-nueva-medida.component.css'
})
export class ModalNuevaMedidaComponent implements OnInit {

  public formMedida: FormGroup = new FormGroup({})

  public tipoMedida = [
    {
      "id": 1,
      "nombre": "Tiempo de Respuesta",
      "valorEsperado": 30,
      "valorMinimo": 20,
      "valorMaximo": 40,
      "unidadMedida": "minutos"
    },
    {
      "id": 2,
      "nombre": "Porcentaje de Satisfacción del Cliente",
      "valorEsperado": 90,
      "valorMinimo": 80,
      "valorMaximo": 100,
      "unidadMedida": "porcentaje"
    }
  ]

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private modalService: MatDialogRef<ModalNuevaMedidaComponent>,
    private fb : FormBuilder

  ){}


  ngOnInit(): void {
   this.initForm();

  }

  public initForm(): void {
    const hoy = new Date()
    this.formMedida = this.fb.group({
      valorMedido:['', [Validators.required]],
      idUnidadMedida:['',[Validators.required]],
      descripcion:['', [Validators.required]],
      fecha : [hoy,[Validators.required]]
    })
  }

  public loadData(data: any): void {

    this.formMedida.controls['valorMedido'].setValue('')
    this.formMedida.controls['idUnidadMedida'].setValue('')
    this.formMedida.controls['descripcion'].setValue('')
    this.formMedida.controls['fecha'].setValue('')

  }


  public cerrarModal(): void{


    this.modalService.close(undefined)

  }

  public enviarForm(): void {

    const form = this.formMedida.value
    this.modalService.close(form)

  }



}
