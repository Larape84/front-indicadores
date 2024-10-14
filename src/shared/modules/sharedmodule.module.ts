import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
export const MY_DATE_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',  // Formato que aceptará al ingresar
    },
    display: {
      dateInput: 'dd/MM/yyyy',  // Formato que mostrará en el input
      monthYearLabel: 'MMM yyyy',  // Formato que muestra el mes y año en el Datepicker
      dateA11yLabel: 'DD/MM/yyyy',  // Formato para accesibilidad (screen readers)
      monthYearA11yLabel: 'MMMM yyyy',  // Formato de accesibilidad para el mes y año
    },
};
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,



  ],
  exports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  providers:[]
})
export class SharedmoduleModule { }
