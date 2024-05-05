import { FareTypeProperties } from '@libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFareTypeDto {
  @IsMongoId()
  @ApiProperty({ type: Types.ObjectId, required: true })
  [FareTypeProperties.showId]: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  [FareTypeProperties.title]: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  [FareTypeProperties.displayColor]?: string;

  @Min(0)
  @ApiProperty({ type: Number, required: true })
  [FareTypeProperties.price]: number;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  [FareTypeProperties.description]?: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  [FareTypeProperties.note]?: string;
}
