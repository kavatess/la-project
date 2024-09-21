import { BasicModel } from './common';
import { Show } from './show';

export enum DiscountProperties {
  type = 'type',
  productId = 'productId',
  product = 'product',
  percent = 'percent',
  amount = 'amount',
}

export enum ProductProperties {
  imgUrl = 'imgUrl',
  name = 'name',
  showId = 'showId',
  show = 'show',
  description = 'description',
  price = 'price',
  status = 'status',
  totalQuantity = 'totalQuantity',
  availableQuantity = 'availableQuantity',
  soldQuantity = 'soldQuantity',
}

export enum ProductStatuses {
  Available = 'Available',
  Inavailable = 'Inavailable',
  OutOfStock = 'OutOfStock',
}

export interface Product extends BasicModel {
  [ProductProperties.imgUrl]: string;
  [ProductProperties.name]: string;
  [ProductProperties.showId]: string;
  [ProductProperties.show]?: Show;
  [ProductProperties.description]: string;
  [ProductProperties.price]: number;
  [ProductProperties.status]: ProductStatuses;
  [ProductProperties.totalQuantity]: number;
  [ProductProperties.availableQuantity]?: number;
  [ProductProperties.soldQuantity]?: number;
}
