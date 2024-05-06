/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthGuard } from './guards/admin-app.guard';
import { LoginDto } from './dto/login.dto';

@Controller('admin/auth')
export class AuthAdminController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.accountName, signInDto.password);
  }

  @Get('profile')
  @UseGuards(AdminAuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
