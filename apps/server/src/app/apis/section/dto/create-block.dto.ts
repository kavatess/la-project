import {
  Aisles,
  AislesProperties,
  BlockProperties,
  BlockTypes,
  Directions,
  Door,
  DoorProperties,
} from '@libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsOptional, Min } from 'class-validator';

export class AislesDto {
  @IsOptional()
  [AislesProperties.name]?: string;

  @IsOptional()
  @IsEnum(Directions)
  [AislesProperties.direction]?: Directions;
}

export class DoorDto {
  @IsOptional()
  [DoorProperties.name]?: string;

  @IsOptional()
  @IsEnum(Directions)
  [DoorProperties.direction]?: Directions;
}

export class CreateBlockDto {
  @IsMongoId()
  @ApiProperty({ type: String, required: true })
  [BlockProperties.showId]: string;

  @IsMongoId()
  @ApiProperty({ type: String, required: true })
  [BlockProperties.sectionId]: string;

  @Min(0)
  @ApiProperty({ type: Number, required: true })
  [BlockProperties.row]: number;

  @Min(0)
  @ApiProperty({ type: Number, required: true })
  [BlockProperties.col]: number;

  @IsEnum(BlockTypes)
  @ApiProperty({ type: BlockTypes, required: true })
  [BlockProperties.type]: BlockTypes;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ type: String, required: false })
  [BlockProperties.seatId]?: string;

  @IsOptional()
  @Type(() => AislesDto)
  @ApiProperty({ type: Object, required: false })
  [BlockProperties.aisles]?: Aisles;

  @IsOptional()
  @Type(() => DoorDto)
  @ApiProperty({ type: Object, required: false })
  [BlockProperties.door]?: Door;
}
