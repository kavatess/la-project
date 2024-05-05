import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FareTypeService } from './fare-type.service';
import { CreateFareTypeDto } from './dto/create-fare-type.dto';
import { UpdateFareTypeDto } from './dto/update-fare-type.dto';

@Controller('fare-type')
export class FareTypeController {
  constructor(private readonly fareTypeService: FareTypeService) {}

  @Post()
  create(@Body() createFareTypeDto: CreateFareTypeDto) {
    return this.fareTypeService.create(createFareTypeDto);
  }

  @Get()
  findAll() {
    return this.fareTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fareTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFareTypeDto: UpdateFareTypeDto
  ) {
    return this.fareTypeService.update(+id, updateFareTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fareTypeService.remove(+id);
  }
}
