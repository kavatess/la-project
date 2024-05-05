import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatAdminController } from './seat.admin-controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './entities/seat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seat.name,
        schema: SeatSchema,
      },
    ]),
  ],
  controllers: [SeatAdminController],
  providers: [SeatService],
})
export class SeatModule {}
