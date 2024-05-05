import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../apis/user/user.service';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.usersService.findOne({ accountName });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
