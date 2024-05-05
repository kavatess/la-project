import { EnvironmentProperties } from '@libs/models';

export const environment = {
  [EnvironmentProperties.production]: true,
  [EnvironmentProperties.apiUrl]: 'http://my-prod-url',
};
