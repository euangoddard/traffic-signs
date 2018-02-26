import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import {
  state,
  style,
  transition,
  animate,
  trigger,
} from '@angular/animations';
import { StateService } from '../state.service';

@Component({
  selector: 'sign',
  templateUrl: './sign.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('score', [
      state(
        'pulse',
        style({
          transform: 'scale(1.2)',
        }),
      ),
      transition('* <=> pulse', animate('200ms ease-out')),
    ]),
  ],
})
export class SignComponent {
  @Input() sign: string;

  scoreState: string = null;

  constructor(public hits: StateService) {}

  @HostListener('click')
  increment() {
    this.hits.incrementHits(this.sign);
    this.scoreState = 'pulse';
  }

  finishAnimation(): void {
    setTimeout(() => (this.scoreState = null));
  }
}
