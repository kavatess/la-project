import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertService {
  readonly _message$ = new Subject<string>();

  public alertError(msg: string) {
    console.error(msg);
    this._message$.next(msg);
  }
}
