import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  state,
  style,
  transition,
  animate,
  trigger,
} from '@angular/animations';
import { StateService } from '../state.service';
import { takeUntilDestroy } from 'take-until-destroy';
import { pairwise } from 'rxjs/operators';
import { SIGNS } from '../signs/signs.component';

const SIGN_COUNT = SIGNS.length;

@Component({
  selector: 'status-overlay',
  templateUrl: './status-overlay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('reward', [
      state('show', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('350ms ease-in'),
      ]),
      transition('* => void', [
        animate('350ms ease-out', style({ transform: 'scale(3)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class StatusOverlayComponent implements OnInit, OnDestroy {
  uniqueHits: number;
  isVisible = false;

  constructor(
    private stateService: StateService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.stateService
      .selectUniqueCount()
      .pipe(takeUntilDestroy(this))
      .subscribe(count => {
        if (count && count % 5 === 0) {
          this.isVisible = true;
          this.uniqueHits = count;
          this.changeDetectorRef.detectChanges();
          setTimeout(() => this.finishReward(), 1500);
        }
      });
  }

  ngOnDestroy(): void {}

  private finishReward(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
  }
}
