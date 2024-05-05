import { Type } from 'class-transformer';
import { FindAllQueryDto } from '../../../shared/dto/find-all-query.dto';
import { UpdateShowDto } from './update-show.dto';
import { IsOptional } from 'class-validator';

export class ShowQueryDto extends FindAllQueryDto {
  @IsOptional()
  @Type(() => UpdateShowDto)
  filter?: UpdateShowDto;
}
