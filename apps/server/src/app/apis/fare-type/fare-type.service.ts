import { Injectable } from '@nestjs/common';
import { DbModelService } from '../../shared/services/db-model.service';
import { FareType, FareTypeDocument } from './entities/fare-type.entity';
import { CreateFareTypeDto } from './dto/create-fare-type.dto';
import { UpdateFareTypeDto } from './dto/update-fare-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FareTypeService extends DbModelService<
  FareType,
  CreateFareTypeDto,
  UpdateFareTypeDto
> {
  constructor(
    @InjectModel(FareType.name)
    protected readonly fareTypeModel: Model<FareTypeDocument>
  ) {
    super(fareTypeModel);
  }
}
