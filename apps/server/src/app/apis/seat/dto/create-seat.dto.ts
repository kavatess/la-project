import { SeatProperties, SeatStatuses } from '@libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSeatDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  [SeatProperties.code]: string;

  @IsEnum(SeatStatuses)
  @ApiProperty({ type: String, enum: SeatStatuses, required: true })
  [SeatProperties.status]: SeatStatuses;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ type: String, required: false })
  [SeatProperties.fareTypeId]: string;
}
