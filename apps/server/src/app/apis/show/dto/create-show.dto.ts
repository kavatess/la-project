import { ShowProperties, ShowStatuses, ShowTypes } from '@libs/models';
import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  [ShowProperties.title]: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
  })
  [ShowProperties.description]: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
  })
  [ShowProperties.logo]: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
  })
  [ShowProperties.slogan]: string;

  @IsOptional()
  @IsEnum(ShowTypes)
  @ApiProperty({
    type: String,
    enum: ShowTypes,
    required: false,
  })
  [ShowProperties.types]: ShowTypes;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    required: true,
  })
  [ShowProperties.startDate]: Date;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    required: true,
  })
  [ShowProperties.endDate]: Date;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
  })
  [ShowProperties.startTime]: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
  })
  [ShowProperties.endTime]: number;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  [ShowProperties.location]: string;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    required: true,
  })
  [ShowProperties.startBookingDate]: Date;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    required: true,
  })
  [ShowProperties.endBookingDate]: Date;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
  })
  [ShowProperties.startBookingTime]: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
  })
  [ShowProperties.endBookingTime]: number;

  @IsEnum(ShowStatuses)
  @ApiProperty({
    type: String,
    enum: ShowStatuses,
    required: true,
  })
  [ShowProperties.status]: ShowStatuses;
}
