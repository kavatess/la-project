export interface FormState<T> {
  data: T;
  valid: boolean;
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
}
