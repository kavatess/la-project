import { Injectable } from '@nestjs/common';
import { DbModelService } from '../../shared/services/db-model.service';
import { Block, BlockDocument } from './entities/block.entity';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class BlockService extends DbModelService<
  Block,
  CreateBlockDto,
  UpdateBlockDto
> {
  constructor(
    @InjectModel(Block.name)
    protected readonly blockModel: Model<BlockDocument>
  ) {
    super(blockModel);
  }
}
