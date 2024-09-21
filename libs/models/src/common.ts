/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BasicModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum SexTypes {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface Option {
  title: string;
  value: string | number;
  data?: any;
}
