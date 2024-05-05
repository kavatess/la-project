import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Show, ShowSchema } from './entities/show.entity';
import { ShowAdminController } from './show.admin-controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Show.name,
        schema: ShowSchema,
      },
    ]),
  ],
  controllers: [ShowAdminController],
  providers: [ShowService],
})
export class ShowModule {}
