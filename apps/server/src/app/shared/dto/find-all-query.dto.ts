/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class OptionsDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  pageSize?: number;
}

export class FindAllQueryDto<T = any> {
  filter?: Partial<T>;

  @IsOptional()
  @Type(() => OptionsDto)
  options?: OptionsDto;
}
