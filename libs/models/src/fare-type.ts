import { BasicModel } from './common';
import { Show } from './show';

export enum FareTypeProperties {
  showId = 'showId',
  show = 'show',
  title = 'title',
  displayColor = 'displayColor',
  price = 'price',
  description = 'description',
  note = 'note',
}

export interface FareType extends BasicModel {
  [FareTypeProperties.showId]: string;
  [FareTypeProperties.show]?: Show;
  [FareTypeProperties.title]: string;
  [FareTypeProperties.displayColor]: string;
  [FareTypeProperties.price]: number;
  [FareTypeProperties.description]: string;
  [FareTypeProperties.note]: string;
}
