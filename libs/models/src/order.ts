import { BasicModel } from './common';
import { Payment } from './payment';
import { Seat } from './seat-map';
import { Show } from './show';
import { User } from './user';

export enum OrderItemProperties {
  orderId = 'orderId',
  order = 'order',
  type = 'type',
  // fareTypeId = 'fareTypeId',
  // fareType = 'fareType',
  // seatIds = 'seatIds',
  seats = 'seats',
  imgUrl = 'imgUrl',
  title = 'title',
  price = 'price',
  quantity = 'quantity',
  total = 'total',
  // discount = 'discount',
  // discountPercent = 'discountPercent',
  // discountAmount = 'discountAmount',
}

export enum OrderItemTypes {
  Seat = 'Seat',
  Other = 'Other',
}

export enum DiscountTypes {
  Percent = 'Percent',
  Amount = 'Amount',
}

export interface OrderItem extends BasicModel {
  [OrderItemProperties.orderId]: string;
  [OrderItemProperties.order]?: Order;
  [OrderItemProperties.type]: OrderItemTypes;
  // [OrderItemProperties.fareTypeId]?: string;
  // [OrderItemProperties.fareType]?: FareType;
  // [OrderItemProperties.seatIds]: string;
  [OrderItemProperties.seats]?: Seat;
  [OrderItemProperties.imgUrl]?: string;
  [OrderItemProperties.title]: string;
  [OrderItemProperties.price]: number;
  [OrderItemProperties.quantity]: number;
  [OrderItemProperties.total]: number;
  // [OrderItemProperties.discount]: DiscountTypes | null;
  // [OrderItemProperties.discountPercent]: number;
  // [OrderItemProperties.discountAmount]: number;
}

export enum OrderProperties {
  showId = 'showId',
  show = 'show',
  // orderItemIds = 'orderItemIds',
  customerId = 'customerId',
  customer = 'customer',
  orderItems = 'orderItems',
  total = 'total',
  paymentId = 'paymentId',
  payment = 'payment',
  status = 'status',
}

export enum OrderStatuses {
  Confirming = 'Confirming',
  PendingPayment = 'PendingPayment',
  Completed = 'Completed',
  PaymentFailed = 'PaymentFailed',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
}

export interface Order extends BasicModel {
  [OrderProperties.showId]: string;
  [OrderProperties.show]?: Show;
  [OrderProperties.customerId]: string;
  [OrderProperties.customer]?: User;
  [OrderProperties.orderItems]: OrderItem[];
  [OrderProperties.total]: number;
  [OrderProperties.paymentId]: string;
  [OrderProperties.payment]?: Payment;
  [OrderProperties.status]: OrderStatuses;
}
