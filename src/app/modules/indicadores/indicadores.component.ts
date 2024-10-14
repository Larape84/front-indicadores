import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedmoduleModule } from '../../../shared/modules/sharedmodule.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaMedidaComponent } from './modal-nueva-medida/modal-nueva-medida.component';
import { UtilServiceService } from '../../services/util-service.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { IndicadoresService } from '../../services/indicadores.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [SharedmoduleModule],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css',

})
export class IndicadoresComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public selectedOption = null
  public displayedColumns : string[] = ['id','descripcion','unidadMedida', 'fecha','valorMinimo','valorMaximo','valorEsperado','valorObtenido', 'editar']
  public tipoMedida : any[] = []


  public dataSource = new MatTableDataSource<any>(this.tipoMedida)

  constructor(
    private _modalService : MatDialog,
    private _utilservice: UtilServiceService,
    private matpaginadorClass : MatPaginatorIntl,
    private _indicadoresService: IndicadoresService
  ){
    this.matpaginadorClass.itemsPerPageLabel = 'Total registros'
  }

  ngOnInit(): void {

    this.listarIndicadores();
    this.obtenerUnidadesMedida();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.paginator.pageSize = this.dataSource.data.length
  }

  public openmodal(indicador: any = undefined): void {


    console.log(indicador)

    this._modalService.open(ModalNuevaMedidaComponent, {
      width:'600px',
      data: indicador
    }).afterClosed().subscribe({
      next:(form)=>{

        if(!form){
          return
        }

        if(!indicador){
          this.crearIndicador(form)
        }else {
          const payload = {
            ...form,
            id: indicador.id
          }
          this.actualizarIndicador(payload)
        }




        console.log(form)



      }
    })



  }

  public crearIndicador(indicador: any): void {

    this.startLoading({})

    this._indicadoresService.crearIndicador(indicador).subscribe({
      next:(resp)=>{

        this.alertSuccess()
        this.listarIndicadores()

      },
      error:()=>{
        this.alertError()
      }
    })
  }

  public actualizarIndicador(indicador : any): void {

    this.startLoading({})

    this._indicadoresService.actualizarIndicador(indicador).subscribe({
      next:(resp)=>{
        this.alertSuccess()
        this.listarIndicadores()
      },
      error:()=>{
        this.alertError()
      }
    })
  }

  public eliminarIndicador(indicador : any): void {
    this.startLoading({})
    this._indicadoresService.elimininarIndicador(indicador).subscribe({
      next:(resp)=>{

        this.alertSuccess()
        this.listarIndicadores()
      },
      error:()=>{
        this.alertError()
      }
    })
  }


  public estiloValor(indicador: any): string {
      const maximo = indicador.unidadMedida.valorMaximo
      const minimo = indicador.unidadMedida.valorMinimo
      const esperado = indicador.unidadMedida.valorEsperado

    "  ENTREGA1: Presente un modelo de entidad relación para este problema y presente un SQL para que despliegue en orden ascendente de fecha los valores de cada medición e indique si está por debajo del valor mínimo (‘ROJO’), si el valor está entre el mínimo y el esperado (‘AMARILLO’), si el valor está entre el esperado y el límite máximo (‘VERDE’), si el valor supera el límite máximo (‘AZUL’)."

    if(indicador.valorMedido < minimo){
      return 'red'
      } else if(indicador.valorMedido >= minimo && indicador.valorMedido < esperado){
        return 'yellow'
      }
      else if(indicador.valorMedido>= esperado && indicador.valorMedido < maximo){
        return 'green'
      }else{
        return 'blue'
      }




  }



  public listarIndicadores(): void {
    this._indicadoresService.listarIndicadores().subscribe({
      next:(resp : any)=>{

        const data = resp?.data ?? []

        this.dataSource = new MatTableDataSource<any[]>(data)


      },
      error:()=>{
        this.alertError()
      }
    })
  }


  public obtenerUnidadesMedida(): void {
    this._indicadoresService.listarUnidadesMedida().subscribe({
      next:(resp: any)=>{
        this.tipoMedida = resp?.data ?? []
      },
      error:()=>{
        this.alertError()
      }
    })
  }

  public downloadData():void {
    const data = this.dataSource.data
    const hoy = moment(new Date()).format("DD-MM-YYYY-hh-mm")
    this._utilservice.exportAsExcelFile(data, `Reporte indicadores_${hoy}`)
  }


  public eliminarRemistro(indicador: any): void {

    Swal.fire({
      allowOutsideClick: false,
      title: '¿Estas seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'flex-row-reverse gap-2',
        cancelButton: 'rounded-full w-26 bg-gray-500 ring-0',
        confirmButton: 'rounded-full w-26 ring-0'
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const payload = {
          id : indicador.id
        }
        this.eliminarIndicador(payload)


      }
    })
  }

  public startLoading({ title = 'Cargando', html = 'Por favor espere' }): void {

    Swal.fire({ title, html, allowOutsideClick: false, timer: 500000, didOpen: () => { Swal.showLoading() }, })

  }

  public stopLoading(): void {
    Swal.close();
  }


  public alertSuccess(text?: string, accion?:any): void {
    text = text || 'Solicitud realizada correctamente'
    const alert = Swal.fire({
      allowOutsideClick: true,
      backdrop: true,
      title: 'Correcto!',
      html: text,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      customClass: {
        confirmButton: 'rounded-full w-20 bg-blue-400 ring-0'
      }
    }).then(()=>{
        if(!!accion){
            accion();
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


}
