import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map, pluck, tap } from 'rxjs/operators';
import * as localforage from 'localforage';

@Injectable()
export class StateService {
  private static STORAGE_KEY = 'hitsBySignSubject';

  private hitsBySignSubject = new BehaviorSubject<HitsBySign>({});

  constructor() {
    this.rehydrate();
  }

  selectHits(sign: string): Observable<number> {
    return this.hitsBySignSubject.pipe(
      pluck<HitsBySign, number>(sign),
      map(v => v || 0),
      distinctUntilChanged(),
    );
  }

  selectUniqueCount(): Observable<number> {
    return this.hitsBySignSubject.pipe(
      map(m => {
        return Object.values(m).filter(v => !!v).length;
      }),
      distinctUntilChanged(),
    );
  }

  reset(): void {
    this.hitsBySignSubject.next({});
    localforage.removeItem(StateService.STORAGE_KEY);
  }

  incrementHits(sign: string): void {
    const hitsBySign = this.hitsBySignSubject.value;
    const hitsForSign = hitsBySign[sign] || 0;
    this.hitsBySignSubject.next({ ...hitsBySign, [sign]: hitsForSign + 1 });
    localforage.setItem(StateService.STORAGE_KEY, this.hitsBySignSubject.value);
  }

  private async rehydrate() {
    const hitsBySignSubject = (await localforage.getItem(
      StateService.STORAGE_KEY,
    )) as HitsBySign;
    this.hitsBySignSubject.next(hitsBySignSubject || {});
  }
}

interface HitsBySign {
  [sign: string]: number;
}
