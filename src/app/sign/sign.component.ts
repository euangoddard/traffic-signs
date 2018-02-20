import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignComponent {
  @Input() sign: string;

  constructor(public state: StateService) {}

  @HostListener('click')
  increment() {
    this.state.incrementHits(this.sign);
  }
}
