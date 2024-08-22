/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '@libs/front-end';
import { <%= className %>, <%= className %>Properties, <%= className %>Statuses } from '@libs/models';

@Component({
  selector: 'la-project-<%= name %>-form',
  templateUrl: './<%= name %>-form.component.html',
  styleUrls: ['./<%= name %>-form.component.scss'],
})
export class <%= className %>FormComponent
  extends AbstractFormComponent<<%= className %>>
  implements OnChanges
{
  readonly <%= className %>Properties = <%= className %>Properties;
  readonly <%= className %>Statuses = <%= className %>Statuses;

  @Output()
  submitForm = new EventEmitter<<%= className %>>();

  readonly form = this.fb.group({
    <%_ for(const prop of props) { _%>
      [<%= className %>Properties.<%= prop %>]: [null, []],
    <%_ } _%>
  });

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  onSubmitBtnClick(): void {
    if (this.form.invalid) return;
    this.submitForm.emit(this.form.value as <%= className %>);
  }
}
