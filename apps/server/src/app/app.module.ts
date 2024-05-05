import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShowModule } from './apis/show/show.module';
import { FareTypeModule } from './apis/fare-type/fare-type.module';
import { UserModule } from './apis/user/user.module';
import { SectionModule } from './apis/section/section.module';
import { SeatModule } from './apis/seat/seat.module';

@Module({
  imports: [
    AuthModule,
    ShowModule,
    FareTypeModule,
    UserModule,
    SectionModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
