import { BasicModel } from './common';

export enum PaymentStatuses {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum PaymentProperties {
  title = 'title',
  description = 'description',
  apiKey = 'apiKey',
  status = 'status',
}

export interface Payment extends BasicModel {
  [PaymentProperties.title]: string;
  [PaymentProperties.description]?: string;
  [PaymentProperties.apiKey]?: string;
  [PaymentProperties.status]: PaymentStatuses;
}
