/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { FindAllQueryDto } from '../dto/find-all-query.dto';

@Injectable()
export class DbModelService<T, CreateDto, UpdateDto> {
  constructor(public readonly model: Model<T & Document>) {}

  async create(createDto: CreateDto) {
    return (await this.model.create(createDto)).toJSON({
      virtuals: true,
    });
  }

  async createMany(list: CreateDto[]) {
    return await this.model.insertMany(list);
  }

  async findAll({ filter, options }: FindAllQueryDto) {
    return await this.model
      .find(filter)
      .skip(options.page * options.pageSize)
      .limit(options.pageSize)
      .lean()
      .exec();
  }

  async findOne(filter: FilterQuery<T>) {
    return await this.model
      .findOne(filter as any)
      .lean()
      .exec();
  }

  async findById(id: string) {
    return await this.model.findById(id).lean().exec();
  }

  async update(id: string, updateDto: Partial<UpdateDto & T>) {
    const show = await this.model.findById(id).exec();
    show.set(updateDto);
    return await show.save();
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id).lean().exec();
  }

  async removeMany(filter: Partial<T>) {
    return await this.model
      .deleteMany(filter as any)
      .lean()
      .exec();
  }
}
