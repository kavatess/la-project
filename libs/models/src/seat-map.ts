import { BasicModel } from './common';
import { FareType } from './fare-type';

export enum SectionProperties {
  showId = 'showId',
  title = 'title',
  // prefix = 'prefix',
  maxRow = 'maxRow',
  maxCol = 'maxCol',
  seatNumber = 'seatNumber',
  seatMap = 'seatMap',
  seatList = 'seatList',
  useRowIndex = 'useRowIndex',
  rowIndexes = 'rowIndexes',
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
  [SectionProperties.useRowIndex]: boolean;
  [SectionProperties.rowIndexes]?: string[];
  [SectionProperties.seatMap]?: Block[][];
  [SectionProperties.seatList]?: Partial<Seat>[];
}

export enum SeatProperties {
  sectionId = 'sectionId',
  blockId = 'blockId',
  code = 'code',
  status = 'status',
  fareTypeId = 'fareTypeId',
  fareType = 'fareType',
}

export enum SeatStatuses {
  Available = 'Available',
  BeingBooked = 'BeingBooked',
  Booked = 'Booked',
  Maintenance = 'Maintenance',
}

export interface Seat extends BasicModel {
  [SeatProperties.sectionId]?: string;
  [SeatProperties.blockId]?: string;
  [SeatProperties.code]: string;
  [SeatProperties.status]: SeatStatuses;
  [SeatProperties.fareTypeId]?: string;
  [SeatProperties.fareType]?: FareType;
}

export enum BlockProperties {
  row = 'row',
  col = 'col',
  type = 'type',
  seatId = 'seatId',
  seat = 'seat',
  entrance = 'entrance',
}

export enum BlockTypes {
  None = 'None',
  Seat = 'Seat',
  Aisles = 'Aisles',
  Wall = 'Wall',
  Entrance = 'Entrance',
}

export interface Block extends BasicModel {
  [BlockProperties.row]: number;
  [BlockProperties.col]: number;
  [BlockProperties.type]: BlockTypes;
  [BlockProperties.seatId]?: string;
  [BlockProperties.seat]?: Seat;
}
