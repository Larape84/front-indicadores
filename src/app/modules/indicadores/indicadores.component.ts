import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedmoduleModule } from '../../../shared/modules/sharedmodule.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaMedidaComponent } from './modal-nueva-medida/modal-nueva-medida.component';
import { UtilServiceService } from '../../services/util-service.service';
import moment from 'moment';
import Swal from 'sweetalert2';

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
  public displayedColumns : string[] = ['id','nombre','valorEsperado','valorMinimo','valorMaximo','unidadMedida','editar']
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
  public dataSource = new MatTableDataSource<any>(this.tipoMedida)

  constructor(
    private modalService : MatDialog,
    private utilservice: UtilServiceService,
    private matpaginadorClass : MatPaginatorIntl
  ){
    this.matpaginadorClass.itemsPerPageLabel = 'Total registros'
  }

  ngOnInit(): void {



  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.paginator.pageSize = this.dataSource.data.length
  }

  public openmodal(): void {

    this.modalService.open(ModalNuevaMedidaComponent, {
      width:'600px'
    })

  }

  public downloadData():void {
    const data = this.dataSource.data
    const hoy = moment(new Date()).format("DD-MM-YYYY-hh-mm")
    this.utilservice.exportAsExcelFile(data, `Reporte indicadores_${hoy}`)
  }


  public eliminarRemistro(row: any): void {
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
