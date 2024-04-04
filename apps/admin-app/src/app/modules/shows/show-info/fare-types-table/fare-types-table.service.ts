/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { FareType } from '@libs/models';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FareTypesTableService {
  editFareTypeById(fareTypeId: string, data: FareType): Observable<FareType> {
    return of(data).pipe(delay(1000));
  }

  deleteFareTypeById(fareTypeId: string): Observable<FareType> {
    return of({ id: fareTypeId } as FareType).pipe(delay(1000));
  }

  addFareType(showId: string, data: FareType): Observable<FareType> {
    return of(data).pipe(delay(1000));
  }
}
