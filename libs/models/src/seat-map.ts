import { BasicModel } from './common';

export enum SectionProperties {
  showId = 'showId',
  title = 'title',
  // prefix = 'prefix',
  maxRow = 'maxRow',
  maxCol = 'maxCol',
  seatNumber = 'seatNumber',
  seatList = 'seatList',
  index = 'index',
}

export interface Section extends BasicModel {
  [SectionProperties.showId]?: string;
  [SectionProperties.title]: string;
  //   [SectionProperties.prefix]: string;
  [SectionProperties.seatNumber]: number;
  [SectionProperties.maxRow]: number;
  [SectionProperties.maxCol]: number;
  [SectionProperties.index]: number;
  [SectionProperties.seatList]?: Partial<Seat>[];
}

export enum SeatProperties {
  sectionId = 'sectionId',
  row = 'row',
  col = 'col',
  code = 'code',
  status = 'status',
}

export enum SeatStatuses {
  Available = 'Available',
  BeingBooked = 'BeingBooked',
  Booked = 'Booked',
  Maintenance = 'Maintenance',
}

export interface Seat extends BasicModel {
  [SeatProperties.sectionId]: string;
  [SeatProperties.row]: string;
  [SeatProperties.col]: string;
  [SeatProperties.code]: string;
  [SeatProperties.status]: SeatStatuses;
}
