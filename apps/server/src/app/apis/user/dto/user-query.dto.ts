import { Type } from 'class-transformer';
import { FindAllQueryDto } from '../../../shared/dto/find-all-query.dto';
import { IsOptional } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UserQueryDto extends FindAllQueryDto {
  @IsOptional()
  @Type(() => UpdateUserDto)
  filter?: UpdateUserDto;
}
