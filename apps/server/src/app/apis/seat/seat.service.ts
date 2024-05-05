import { Injectable } from '@nestjs/common';
import { DbModelService } from '../../shared/services/db-model.service';
import { Seat, SeatDocument } from './entities/seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeatService extends DbModelService<
  Seat,
  CreateSeatDto,
  UpdateSeatDto
> {
  constructor(
    @InjectModel(Seat.name)
    protected readonly seatModel: Model<SeatDocument>
  ) {
    super(seatModel);
  }
}
