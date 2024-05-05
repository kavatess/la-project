import { Module } from '@nestjs/common';
import { FareTypeService } from './fare-type.service';
import { FareTypeController } from './fare-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FareType, FareTypeSchema } from './entities/fare-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FareType.name,
        schema: FareTypeSchema,
      },
    ]),
  ],
  controllers: [FareTypeController],
  providers: [FareTypeService],
})
export class FareTypeModule {}
