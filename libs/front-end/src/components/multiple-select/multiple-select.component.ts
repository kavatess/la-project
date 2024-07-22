/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

export interface Option {
  title: string;
  value: string | number;
}

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleSelectComponent),
      multi: true,
    },
  ],
})
export class MultipleSelectComponent
  implements ControlValueAccessor, OnChanges, OnInit, OnDestroy
{
  @Input()
  disabled = false;

  @Input()
  options: Option[] = [];

  readonly multiSelect = this.fb.array([]);

  onChange = (val: any[]) => {};

  onTouched = () => {};

  selectedOptions: Option[] = [];
  subscription: Subscription = null;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.multiSelect.valueChanges.subscribe((val) => {
      this.selectedOptions = this.options.filter((opt, i) => val[i]);
      this.onChange(this.selectedOptions.map((opt) => opt.value));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.multiSelect.clear({
        emitEvent: false,
      });
      this.options.forEach(() => {
        this.multiSelect.push(this.fb.control(false), {
          emitEvent: false,
        });
      });
    }
  }

  writeValue(items: any[]): void {
    this.selectedOptions = this.options.length
      ? this.options.filter((opt) => items.includes(opt.value))
      : items.map((item) => ({ value: item, title: item }));
    this.options.forEach(({ value }, index) => {
      if (items.includes(value)) {
        this.multiSelect.at(index).patchValue(true, {
          emitEvent: false,
        });
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
