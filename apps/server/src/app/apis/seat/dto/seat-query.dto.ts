import { Type } from 'class-transformer';
import { FindAllQueryDto } from '../../../shared/dto/find-all-query.dto';
import { IsOptional } from 'class-validator';
import { UpdateSeatDto } from './update-seat.dto';

export class SeatQueryDto extends FindAllQueryDto {
  @IsOptional()
  @Type(() => UpdateSeatDto)
  filter?: UpdateSeatDto;
}
