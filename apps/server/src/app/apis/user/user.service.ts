import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { DbModelService } from '../../shared/services/db-model.service';

@Injectable()
export class UserService extends DbModelService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectModel(User.name)
    protected readonly userModel: Model<UserDocument>
  ) {
    super(userModel);
  }
}
