import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthAdminController } from './auth.admin-controller';
import { UserModule } from '../apis/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'abc',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthService],
})
export class AuthModule {}
