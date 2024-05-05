import { Type } from 'class-transformer';
import { FindAllQueryDto } from '../../../shared/dto/find-all-query.dto';
import { IsOptional } from 'class-validator';
import { UpdateFareTypeDto } from './update-fare-type.dto';

export class FareTypeQueryDto extends FindAllQueryDto {
  @IsOptional()
  @Type(() => UpdateFareTypeDto)
  filter?: UpdateFareTypeDto;
}
