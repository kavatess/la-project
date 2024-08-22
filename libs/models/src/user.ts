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
  status = 'status',
}

export enum UserStatuses {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum UserGenders {
  Male = 'Male',
  Female = 'Female',
}

export enum UserRoles {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Staff = 'Staff',
  Customer = 'Customer',
}

export const userRoleList = Object.keys(UserRoles).map((key) => key);

export interface User extends BasicModel {
  [UserProperties.lastName]: string;
  [UserProperties.firstName]: string;
  [UserProperties.fullName]?: string;
  [UserProperties.sex]?: UserGenders;
  [UserProperties.dob]?: Date;
  [UserProperties.email]?: string;
  [UserProperties.phone]: string;
  [UserProperties.address]?: string;
  [UserProperties.role]: string;
  [UserProperties.portrait]?: string;
  [UserProperties.note]?: string;
  [UserProperties.status]: UserStatuses;
}
