/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, of, Subscription, switchMap, take } from 'rxjs';
import { Option } from '@libs/models';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectComponent),
      multi: true,
    },
  ],
})
export class SearchSelectComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input()
  disabled = false;

  @Input()
  multiple = false;

  @Input()
  customOption: TemplateRef<any> = null;

  @Input()
  findFn = (ids: string[]) => of([]);

  @Input()
  searchByTxtFn = (text: string, excludeIds: string[]) => of([]);

  @Input()
  displayTitle = (value: any) => value;

  readonly searchCtrl = this.fb.control(null, [Validators.maxLength(256)]);

  options: Option[] = [];
  selected: Option[] = [];
  subscription: Subscription = null;

  onChange = (val: string | string[]) => {};
  onTouched = () => {};

  constructor(private readonly fb: FormBuilder) {}

  get selectedIds(): string[] {
    return this.selected.map((s) => s.value) as string[];
  }

  ngOnInit(): void {
    this.subscription = this.searchCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((txt) => this.searchByTxtFn(txt, this.selectedIds))
      )
      .subscribe((results) => {
        this.options = results.map((data) => ({
          value: data.id,
          title: this.displayTitle(data),
          data,
        }));
      });
  }

  select(option: Option): void {
    this.searchCtrl.setValue(null, { emitEvent: false });
    if (this.multiple) {
      this.selected = [...this.selected, option];
      this.onChange(this.selectedIds);
    } else {
      this.selected = [option];
      this.onChange(this.selectedIds[0]);
    }
    this.onTouched();
    this.options = [];
  }

  deselect(option: Option): void {
    if (this.multiple) {
      this.selected = this.selected.filter((s) => s.value !== option.value);
      this.onChange(this.selectedIds);
    } else {
      this.selected = [];
      this.onChange(null);
    }
    this.onTouched();
  }

  writeValue(value: string | string[]): void {
    if (!value) return;
    this.findFn(Array.isArray(value) ? value : [value])
      .pipe(take(1))
      .subscribe((selectedList) => {
        this.selected = selectedList.map((data) => ({
          value: data.id,
          title: this.displayTitle(data),
          data,
        }));
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
