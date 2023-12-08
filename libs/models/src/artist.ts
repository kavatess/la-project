import { BasicModel } from './common';

export enum ArtistProperties {
  name = 'name',
  sex = 'sex',
  dob = 'dob',
  roles = 'roles',
  portrait = 'portrait',
  description = 'description',
}

export interface ArtistModel extends BasicModel {
  [ArtistProperties.name]: string;
  [ArtistProperties.sex]: string;
  [ArtistProperties.dob]: Date;
  [ArtistProperties.roles]: string[];
  [ArtistProperties.portrait]: string;
  [ArtistProperties.description]: string;
}
