import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { OptionsDto } from '../dto/find-all-query.dto';

export function ApiFindAllQuery({ type }) {
  return applyDecorators(
    ApiQuery({
      name: 'filter',
      type,
      required: false,
    }),
    ApiQuery({
      name: 'options',
      type: OptionsDto,
      required: false,
    })
  );
}
