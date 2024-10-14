import { Component, Inject, OnInit } from '@angular/core';
import { SharedmoduleModule } from '../../../../shared/modules/sharedmodule.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarNumeros } from '../../../../shared/Validators/validator';
import { IndicadoresService } from '../../../services/indicadores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-nueva-medida',
  standalone: true,
  imports: [SharedmoduleModule],
  templateUrl: './modal-nueva-medida.component.html',
  styleUrl: './modal-nueva-medida.component.css'
})
export class ModalNuevaMedidaComponent implements OnInit {

  public formMedida: FormGroup = new FormGroup({})

  public tipoMedida: any[] = []
  public valoresMedida = 'Seleccione una medida'

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private modalService: MatDialogRef<ModalNuevaMedidaComponent>,
    private fb : FormBuilder,
    private _indicadoresService : IndicadoresService

  ){}


  ngOnInit(): void {
   this.initForm();
   this.obtenerUnidadesMedida();
   if(!!this.data){
    this.loadData()
   }

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

  public loadData(): void {
    console.log(this.data)
    this.formMedida.controls['valorMedido'].setValue(this.data.valorMedido)
    this.formMedida.controls['idUnidadMedida'].setValue(this.data.unidadMedida.id)
    this.formMedida.controls['descripcion'].setValue(this.data.descripcion)
    this.formMedida.controls['fecha'].setValue(this.data.fecha)

  }

  public cambioMedida(): void {

    const {idUnidadMedida} = this.formMedida.value

    this.formMedida.controls['valorMedido'].clearValidators();
    this.formMedida.controls['valorMedido'].addValidators([Validators.required])
    this.valoresMedida = 'Seleccione una medida'

    if(!idUnidadMedida){
      return
    }

    const {valorMinimo, valorMaximo, valorEsperado} = this.tipoMedida.find(item=>item.id === idUnidadMedida)

    this.valoresMedida = `Valor esperado:${valorEsperado} - valor minimo:${valorMinimo} - valor maximo:${valorMaximo}`

    this.formMedida.controls['valorMedido'].addValidators([ValidarNumeros()])
  }

  public obtenerUnidadesMedida(): void {
    this._indicadoresService.listarUnidadesMedida().subscribe({
      next:(resp: any)=>{
          this.tipoMedida =  resp.data ?? []
      },
      error:()=>{
        this.alertError()
      }
    })
  }

  public alertError(param?:any): void {

    // this.stopLoading();

    Swal.fire({
      allowOutsideClick: true,
      backdrop: true,
      title: 'Error!',
      text: param?.text || "Su solicitud no pudo ser procesada, por favor intente nuevamente",
      icon: 'error',
      customClass: {
        confirmButton: 'rounded-full w-20 bg-gray-400 ring-0'
      }
    })
  }


  public cerrarModal(): void{


    this.modalService.close(undefined)

  }

  public enviarForm(): void {

    const form = this.formMedida.value
    this.modalService.close(form)

  }





}
