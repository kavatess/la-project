import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableParentService } from '@libs/front-end';
import { <%= className %>, <%= className %>Properties } from '@libs/models';
import { debounceTime, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class <%= className %>sService implements TableParentService<<%= className %>> {
  constructor(private readonly http: HttpClient) {}

  getData(): Observable<<%= className %>[]> {
    return of([]).pipe(debounceTime(2000));
  }

  get<%= className %>ById(<%= name %>Id: string): Observable<<%= className %>> {
    return of({} as <%= className %>);
  }

  create<%= className %>(<%= name %>: <%= className %>): Observable<<%= className %>> {
    return of(<%= name %>);
  }

  update<%= className %>(
    <%= name %>Id: string,
    data: Partial<<%= className %>>
  ): Observable<<%= className %>> {
    return of(data as <%= className %>);
  }
}
