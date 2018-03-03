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
        'flat',
        style({
          transform: 'scale(1)',
          boxShadow: '0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28)',
        }),
      ),
      state(
        'pulse',
        style({
          transform: 'scale(1.5)',
          boxShadow: '0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32)',
        }),
      ),
      transition('flat => pulse', animate('250ms ease-out')),
      transition('pulse => flat', animate('250ms ease-in')),
    ]),
  ],
})
export class SignComponent {
  @Input() sign: string;

  scoreState = 'flat';

  constructor(public hits: StateService) {}

  @HostListener('click')
  increment() {
    this.hits.incrementHits(this.sign);
    this.scoreState = 'pulse';
  }

  finishAnimation({ toState }): void {
    if (toState === 'pulse') {
      this.scoreState = 'flat';
    }
  }
}
