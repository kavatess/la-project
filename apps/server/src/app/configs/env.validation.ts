import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum Environments {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export enum EnvVarProperties {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  DATABASE_URL = 'DATABASE_URL',
  DATABASE_NAME = 'DATABASE_NAME',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRES_IN = 'JWT_EXPIRES_IN',
}

export class EnvironmentVariables {
  @IsEnum(Environments)
  [EnvVarProperties.NODE_ENV]: Environments;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvVarProperties.PORT]: number;

  @IsNotEmpty()
  [EnvVarProperties.DATABASE_URL]: string;

  @IsNotEmpty()
  [EnvVarProperties.DATABASE_NAME]: string;

  @IsNotEmpty()
  [EnvVarProperties.JWT_SECRET]: string;

  @IsNotEmpty()
  [EnvVarProperties.JWT_EXPIRES_IN]: string;
}

export function envValidate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
