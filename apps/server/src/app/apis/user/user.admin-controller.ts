import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiFindAllQuery } from '../../shared/decorators/api-get-query.decorator';
import { UserQueryDto } from './dto/user-query.dto';
import { AdminAuthGuard } from '../../auth/guards/admin-app.guard';

@UseGuards(AdminAuthGuard)
@Controller('admin/apis/user')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiFindAllQuery({ type: UserQueryDto })
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
