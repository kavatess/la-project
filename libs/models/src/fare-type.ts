import { BasicModel } from './common';

export enum FareTypeProperties {
  title = 'title',
  displayColor = 'displayColor',
  price = 'price',
}

export interface FareType extends BasicModel {
  [FareTypeProperties.title]: string;
  [FareTypeProperties.displayColor]: string;
  [FareTypeProperties.price]: number;
}
