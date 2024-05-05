import { SectionProperties } from '@libs/models';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateSectionDto {
  @IsMongoId()
  @ApiProperty({
    type: String,
    required: true,
  })
  [SectionProperties.showId]: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  [SectionProperties.title]: string;

  @Min(1)
  @ApiProperty({
    type: Number,
    required: true,
  })
  [SectionProperties.maxCol]: number;

  @Min(1)
  @ApiProperty({
    type: Number,
    required: true,
  })
  [SectionProperties.maxRow]: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: false,
  })
  [SectionProperties.useRowIndex]: boolean;

  @IsOptional()
  @IsNotEmpty({ each: true })
  @ApiProperty({
    type: [String],
    required: false,
  })
  [SectionProperties.rowIndexes]: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: false,
  })
  [SectionProperties.indexReversed]: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
  })
  [SectionProperties.index]: number;
}
