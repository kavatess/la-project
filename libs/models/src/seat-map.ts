import { BasicModel } from './common';

export enum SectionProperties {
  showId = 'showId',
  title = 'title',
  // prefix = 'prefix',
  maxRow = 'maxRow',
  maxCol = 'maxCol',
  seatNumber = 'seatNumber',
  seatMap = 'seatMap',
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
  [SectionProperties.seatMap]?: Block[][];
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

export enum BlockProperties {
  row = 'row',
  col = 'col',
  type = 'type',
  seatId = 'seatId',
  seat = 'seat',
}

export enum BlockTypes {
  None = 'None',
  Seat = 'Seat',
  Aisles = 'Aisles',
  Entrance = 'Entrance',
}

export interface Block extends BasicModel {
  [BlockProperties.row]: number;
  [BlockProperties.col]: number;
  [BlockProperties.type]: BlockTypes;
  [BlockProperties.seatId]?: string;
  [BlockProperties.seat]?: Seat;
}
