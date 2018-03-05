import { Component } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  constructor(public state: StateService) {}
}
