/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { AdminAuthGuard } from './guards/admin-app.guard';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserPayload } from '../shared/decorators/user-payload.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('admin/auth')
export class AuthAdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.accountName, signInDto.password);
  }

  @UseGuards(AdminAuthGuard)
  @Post('change-password')
  @ApiBody({ type: ChangePasswordDto })
  @HttpCode(HttpStatus.OK)
  changePassword(
    @UserPayload() payload: JwtPayload,
    @Body() changePassDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(payload, changePassDto);
  }

  @UseGuards(AdminAuthGuard)
  @Get('profile')
  getProfile(@UserPayload() payload: JwtPayload) {
    return this.authService.getUserProfile(payload);
  }

  @UseGuards(AdminAuthGuard)
  @Patch('profile/update')
  @ApiBody({ type: UpdateProfileDto })
  @HttpCode(HttpStatus.OK)
  updateProfile(
    @UserPayload() payload: JwtPayload,
    @Body() profileDto: UpdateProfileDto
  ) {
    return this.authService.updateProfile(payload, profileDto);
  }
}
