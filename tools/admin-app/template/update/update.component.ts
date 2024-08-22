import { Component, OnInit, ViewChild } from '@angular/core';
import { <%= className %>sService } from '../<%= name %>s.service';
import { FormState, <%= className %> } from '@libs/models';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'la-project-update-<%= name %>',
  templateUrl: './update-<%= name %>.component.html',
  styleUrls: ['./update-<%= name %>.component.scss'],
})
export class Update<%= className %>Component implements OnInit {
  formState: FormState<<%= className %>> = null;

  constructor(
    private readonly service: <%= className %>sService,
    private readonly router: ActivatedRoute
  ) {}

  get <%= name %>Id() {
    return this.router.snapshot.paramMap.get('<%= name %>Id') as string;
  }

  ngOnInit(): void {
    this.service
      .get<%= className %>ById(this.<%= name %>Id)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((<%= name %>) => {
        this.formState = {
          data: <%= name %>,
          pristine: true,
          touched: false,
        };
      });
  }

  update<%= className %>(data: <%= className %>) {
    this.service
      .update<%= className %>(this.<%= name %>Id, data)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((updated<%= className %>) => {
        this.formState = {
          data: updated<%= className %>,
          pristine: true,
          touched: false,
        };
      });
  }
}
