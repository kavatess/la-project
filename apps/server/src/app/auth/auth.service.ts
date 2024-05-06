import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../apis/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from '@libs/models';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

export interface JwtPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(
    accountName: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.model
      .findOne({
        accountName,
        role: {
          $in: [UserRoles.Admin, UserRoles.SuperAdmin],
        },
      })
      .select('phone password')
      .lean()
      .exec();
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user._id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(
    { userId }: JwtPayload,
    { oldPassword, newPassword }: ChangePasswordDto
  ) {
    const user = await this.usersService.model
      .findOne({
        _id: userId,
        role: {
          $in: [UserRoles.Admin, UserRoles.SuperAdmin],
        },
      })
      .select('password')
      .lean()
      .exec();
    if (user?.password !== oldPassword) {
      throw new UnauthorizedException();
    }
    return await this.usersService.update(userId, { password: newPassword });
  }

  async getUserProfile({ userId }: JwtPayload) {
    return await this.usersService.findById(userId);
  }

  async updateProfile({ userId }: JwtPayload, profile: UpdateProfileDto) {
    return await this.usersService.update(userId, profile);
  }
}
