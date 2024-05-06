import { BasicModel } from './common';
import { Section } from './seat-map';

export enum ShowProperties {
  title = 'title',
  description = 'description',
  logo = 'logo',
  slogan = 'slogan',
  types = 'types',
  // artists = 'artists',
  note = 'note',
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',
  location = 'location',
  startBookingDate = 'startBookingDate',
  startBookingTime = 'startBookingTime',
  endBookingDate = 'endBookingDate',
  endBookingTime = 'endBookingTime',
  seatNumber = 'seatNumber',
  remainingSeatNumber = 'remainingSeatNumber',
  isFull = 'isFull',
  status = 'status',
  sections = 'sections',
}

export enum ShowTypes {
  Classical = 'Classical',
  Pop = 'Pop',
  Rock = 'Rock',
}
export const showTypeArr = Object.keys(ShowTypes).map((key) => key);

export enum ShowStatuses {
  Created = 'Created',
  Open = 'Open',
  BookingOpened = 'BookingOpened',
  BookingEnded = 'BookingEnded',
  Close = 'Closed',
}
export const showStatusArr = Object.keys(ShowStatuses).map((key) => key);

export interface Show extends BasicModel {
  [ShowProperties.title]: string;
  [ShowProperties.description]: string;
  [ShowProperties.logo]: string;
  [ShowProperties.slogan]: string;
  [ShowProperties.types]: ShowTypes[];
  // [ShowProperties.artists]: string[];
  [ShowProperties.note]: string;
  [ShowProperties.location]: string;
  [ShowProperties.startDate]: Date;
  [ShowProperties.endDate]: Date;
  [ShowProperties.startTime]: number;
  [ShowProperties.endTime]: number;
  [ShowProperties.startBookingDate]: Date;
  [ShowProperties.startBookingTime]: number;
  [ShowProperties.endBookingDate]: Date;
  [ShowProperties.endBookingTime]: number;
  [ShowProperties.seatNumber]: number;
  [ShowProperties.remainingSeatNumber]?: number;
  [ShowProperties.status]: ShowStatuses;
  [ShowProperties.isFull]?: boolean;
  [ShowProperties.sections]?: Section[];
}
