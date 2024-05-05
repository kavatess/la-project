import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAdminController } from './user.admin-controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserAdminController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
