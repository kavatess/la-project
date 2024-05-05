import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiFindAllQuery } from '../../shared/decorators/api-get-query.decorator';
import { ShowQueryDto } from './dto/show-query.dto';
import { AdminAuthGuard } from '../../auth/guards/admin-app.guard';

@UseGuards(AdminAuthGuard)
@Controller('admin/apis/show')
export class ShowAdminController {
  constructor(private readonly showService: ShowService) {}

  @Post()
  @ApiBody({ type: CreateShowDto })
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.create(createShowDto);
  }

  @Get()
  @ApiFindAllQuery({ type: ShowQueryDto })
  findAll(@Query() query: ShowQueryDto) {
    return this.showService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.showService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
    return this.showService.update(id, updateShowDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.showService.remove(id);
  // }
}
