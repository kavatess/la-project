import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { AdminAuthGuard } from '../../auth/guards/admin-app.guard';
import { ApiFindAllQuery } from '../../shared/decorators/api-get-query.decorator';
import { SeatQueryDto } from './dto/seat-query.dto';

@UseGuards(AdminAuthGuard)
@Controller('admin/apis/seat')
export class SeatAdminController {
  constructor(private readonly seatService: SeatService) {}

  // @Post()
  // @ApiBody({ type: CreateSeatDto })
  // create(@Body() createSeatDto: CreateSeatDto) {
  //   return this.seatService.create(createSeatDto);
  // }

  @Get()
  @ApiFindAllQuery({ type: SeatQueryDto })
  findAll(@Query() query: SeatQueryDto) {
    return this.seatService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(id, updateSeatDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.seatService.remove(id);
  // }
}
