import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertService {
  readonly _message$ = new Subject<string>();

  public alertError(msg: string) {
    this._message$.next(msg);
  }
}
