import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthAdminController } from './auth.admin-controller';
import { UserModule } from '../apis/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVarProperties } from '../configs/env.validation';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get(EnvVarProperties.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(EnvVarProperties.JWT_EXPIRES_IN),
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthService],
})
export class AuthModule {}
