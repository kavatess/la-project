import { UserGenders, UserProperties } from '@libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  [UserProperties.firstName]: string;

  @IsNotEmpty()
  @ApiProperty()
  [UserProperties.lastName]: string;

  @IsNumberString()
  @ApiProperty()
  [UserProperties.phone]: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  [UserProperties.email]: string;

  @IsOptional()
  @ApiProperty()
  [UserProperties.address]: string;

  @IsOptional()
  @IsEnum(UserGenders)
  @ApiProperty()
  [UserProperties.sex]: UserGenders;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  @ApiProperty()
  [UserProperties.dob]: Date;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  [UserProperties.portrait]: string;

  @IsOptional()
  @ApiProperty()
  [UserProperties.note]: string;
}
