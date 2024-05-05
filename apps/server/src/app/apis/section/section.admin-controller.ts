import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { AdminAuthGuard } from '../../auth/guards/admin-app.guard';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@UseGuards(AdminAuthGuard)
@Controller('admin/apis/section')
export class SectionAdminController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @ApiBody({ type: CreateSectionDto })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  // @Get()
  // findAll() {
  //   return this.sectionService.findAll();
  // }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.sectionService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
