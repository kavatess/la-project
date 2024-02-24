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
  indexReversed = 'indexReversed',
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
  [SectionProperties.indexReversed]?: boolean;
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
export const seatStatusList = Object.keys(SeatStatuses).map((key) => key);

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
  door = 'door',
  aisles = 'aisles',
}

export enum BlockTypes {
  None = 'None',
  Seat = 'Seat',
  Aisles = 'Aisles',
  Wall = 'Wall',
  Door = 'Door',
}
export const blockTypeList = Object.keys(BlockTypes).map(
  (key) => key
) as BlockTypes[];

export interface Block extends BasicModel {
  [BlockProperties.row]?: number;
  [BlockProperties.col]?: number;
  [BlockProperties.type]: BlockTypes;
  [BlockProperties.seatId]?: string;
  [BlockProperties.seat]?: Seat;
  [BlockProperties.aisles]?: Aisles;
  [BlockProperties.door]?: Door;
}

export interface WallBlock extends Block {
  [BlockProperties.type]: BlockTypes.Wall | BlockTypes.Door;
}

export interface SeatBlock extends Block {
  [BlockProperties.type]: BlockTypes.Seat;
  [BlockProperties.seat]: Seat;
}

export interface NonSeatBlock extends Block {
  [BlockProperties.type]: BlockTypes.None | BlockTypes.Aisles;
  [BlockProperties.aisles]?: Aisles;
}

export enum DoorTypes {
  Entrance = 'Entrance',
  Exit = 'Exit',
}
export const doorTypeList = [DoorTypes.Entrance, DoorTypes.Exit];

export enum Directions {
  North = 'North',
  South = 'South',
  East = 'East',
  West = 'West',
}
export const directionList = Object.keys(Directions).map((key) => key);

export enum DoorProperties {
  name = 'name',
  type = 'type',
  direction = 'direction',
}

export interface Door {
  [DoorProperties.name]: string;
  [DoorProperties.type]: DoorTypes;
  [DoorProperties.direction]: Directions;
}

export enum AislesProperties {
  name = 'name',
  direction = 'direction',
}

export interface Aisles {
  [AislesProperties.name]: string;
  [AislesProperties.direction]: Directions;
}
