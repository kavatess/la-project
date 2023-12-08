import { BasicModel } from './common';

export enum UserProperties {
  accountName = 'accountName',
  password = 'password',
  lastName = 'lastName',
  firstName = 'firstName',
  fullName = 'fullName',
  sex = 'sex',
  dob = 'dob',
  email = 'email',
  phone = 'phone',
  address = 'address',
  role = 'role',
  portrait = 'portrait',
  note = 'note',
}

export interface User extends BasicModel {
  [UserProperties.lastName]: string;
  [UserProperties.firstName]: string;
  [UserProperties.fullName]: string;
  [UserProperties.sex]: string;
  [UserProperties.dob]: Date;
  [UserProperties.email]: string;
  [UserProperties.phone]: string;
  [UserProperties.address]: string;
  [UserProperties.role]: string;
  [UserProperties.portrait]: string;
  [UserProperties.note]: string;
}
