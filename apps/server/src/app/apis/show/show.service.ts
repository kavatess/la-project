import { Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Show, ShowDocument } from './entities/show.entity';
import { Model } from 'mongoose';
import { DbModelService } from '../../shared/services/db-model.service';

@Injectable()
export class ShowService extends DbModelService<
  Show,
  CreateShowDto,
  UpdateShowDto
> {
  constructor(
    @InjectModel(Show.name)
    protected readonly showModel: Model<ShowDocument>
  ) {
    super(showModel);
  }
}
