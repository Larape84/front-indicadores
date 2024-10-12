import { Component } from '@angular/core';
import { SharedmoduleModule } from '../../modules/sharedmodule.module';

@Component({
  selector: 'app-nav-component',
  standalone: true,
  imports: [SharedmoduleModule],
  templateUrl: './nav-component.component.html',
  styleUrl: './nav-component.component.css'
})
export class NavComponentComponent {

  public rutas = [
    {name: 'indicadores', ruta : ''}
  ]

}
