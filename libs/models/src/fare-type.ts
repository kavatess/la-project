import { BasicModel } from './common';

export enum FareTypeProperties {
  title = 'title',
  displayColor = 'displayColor',
  price = 'price',
  description = 'description',
  note = 'note',
}

export interface FareType extends BasicModel {
  [FareTypeProperties.title]: string;
  [FareTypeProperties.displayColor]: string;
  [FareTypeProperties.price]: number;
  [FareTypeProperties.description]: string;
  [FareTypeProperties.note]: string;
}
