import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormState } from '@libs/models';

@Directive()
export abstract class AbstractFormComponent<T> implements OnChanges {
  @Input()
  formState: FormState<T>;
  @Input()
  disabled: boolean | string[] = false;

  abstract readonly form: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formState']) {
      this.setFormState(this.formState);
    }
    if (changes['disabled']) {
      this.setFormDisability(this.disabled);
    }
  }

  protected setFormState(state: FormState<T>): void {
    this.form.patchValue(state.data);
    if (state.pristine) {
      return this.form.markAsPristine();
    }
    if (state.touched) {
      this.form.markAsTouched({ onlySelf: true });
    } else {
      this.form.markAsUntouched();
    }
    if (state.dirty) {
      this.form.markAsDirty({ onlySelf: true });
    }
  }

  protected setFormDisability(disabled: boolean | string[]): void {
    if (typeof disabled === 'boolean') {
      if (this.disabled) {
        return this.form.disable();
      } else {
        return this.form.enable();
      }
    }
    if (Array.isArray(disabled)) {
      disabled.forEach((ctrlName) => this.form.get(ctrlName).disable());
    }
  }
}
