import { EnvironmentProperties } from '@libs/models';

export const environment = {
  [EnvironmentProperties.production]: false,
  [EnvironmentProperties.apiUrl]: 'http://localhost:1000/admin',
};
