import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FareTypeService } from './fare-type.service';
import { CreateFareTypeDto } from './dto/create-fare-type.dto';
import { UpdateFareTypeDto } from './dto/update-fare-type.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiFindAllQuery } from '../../shared/decorators/api-get-query.decorator';
import { FareTypeQueryDto } from './dto/fare-type-query.dto';

@Controller('fare-type')
export class FareTypeController {
  constructor(private readonly fareTypeService: FareTypeService) {}

  @Post()
  create(@Body() createFareTypeDto: CreateFareTypeDto) {
    return this.fareTypeService.create(createFareTypeDto);
  }

  @Get()
  @ApiFindAllQuery({ type: FareTypeQueryDto })
  findAll(@Query() query: FareTypeQueryDto) {
    return this.fareTypeService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.fareTypeService.findById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateFareTypeDto })
  update(
    @Param('id') id: string,
    @Body() updateFareTypeDto: UpdateFareTypeDto
  ) {
    return this.fareTypeService.update(id, updateFareTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fareTypeService.remove(id);
  }
}
