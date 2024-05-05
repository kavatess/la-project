import { UserProperties } from '@libs/models';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  [UserProperties.accountName]: string;

  @IsNotEmpty()
  [UserProperties.password]: string;
}
