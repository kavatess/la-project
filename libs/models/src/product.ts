import { BasicModel } from './common';
import { Show } from './show';

export enum ProductProperties {
  name = 'name',
  showId = 'showId',
  show = 'show',
  description = 'description',
  price = 'price',
  status = 'status',
}

export enum ProductStatuses {
  Available = 'Available',
  Inavailable = 'Inavilable',
  OutOfStock = 'OutOfStock',
}

export interface Product extends BasicModel {
  [ProductProperties.name]: string;
  [ProductProperties.showId]: string;
  [ProductProperties.show]?: Show;
  [ProductProperties.description]: string;
  [ProductProperties.price]: number;
  [ProductProperties.status]: ProductStatuses;
}
