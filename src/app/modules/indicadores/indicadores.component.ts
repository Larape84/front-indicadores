import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedmoduleModule } from '../../../shared/modules/sharedmodule.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaMedidaComponent } from './modal-nueva-medida/modal-nueva-medida.component';
import { UtilServiceService } from '../../services/util-service.service';
import moment from 'moment';

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
  public displayedColumns : string[] = ['id','nombre','valorEsperado','valorMinimo','valorMaximo','unidadMedida']
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



}
