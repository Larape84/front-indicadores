import { Component } from '@angular/core';
import { SharedmoduleModule } from '../../modules/sharedmodule.module';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [SharedmoduleModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {

}
