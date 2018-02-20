import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map, pluck, tap } from 'rxjs/operators';

@Injectable()
export class StateService {
  private hitsBySignSubject = new BehaviorSubject<HitsBySign>({});

  constructor() {}

  selectHits(sign: string): Observable<number> {
    return this.hitsBySignSubject.pipe(
      pluck<HitsBySign, number>(sign),
      map(v => v || 0),
      distinctUntilChanged(),
      tap(v => console.log(sign, v)),
    );
  }

  reset(): void {
    this.hitsBySignSubject.next({});
  }

  incrementHits(sign: string): void {
    const hitsBySign = this.hitsBySignSubject.value;
    const hitsForSign = hitsBySign[sign] || 0;
    this.hitsBySignSubject.next({ ...hitsBySign, [sign]: hitsForSign + 1 });
  }
}

interface HitsBySign {
  [sign: string]: number;
}
