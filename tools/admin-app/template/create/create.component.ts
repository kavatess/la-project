import { Component } from '@angular/core';
import { <%= className %>sService } from '../<%= name %>s.service';
import { <%= className %> } from '@libs/models';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';
import { <%= className %>sRoutes } from '../<%= name %>s.routes';

@Component({
  selector: 'la-project-create-<%= name %>',
  templateUrl: './create-<%= name %>.component.html',
  styleUrls: ['./create-<%= name %>.component.scss'],
})
export class Create<%= className %>Component {
  constructor(
    private readonly service: <%= className %>sService,
    private readonly router: Router
  ) {}

  create<%= className %>(data: <%= className %>) {
    this.service
      .create<%= className %>(data)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((<%= name %>) => {
        this.router.navigate([
          AppRoutes.<%= className %>s,
          <%= className %>sRoutes.Update,
          <%= name %>.id || null,
        ]);
      });
  }
}
