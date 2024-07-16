import { Aisles, BlockProperties, BlockTypes, Door } from '@libs/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ModelNames } from '../../../app.constants';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Block {
  @Prop({ type: Types.ObjectId, required: true })
  [BlockProperties.showId]: string;

  @Prop({ type: Types.ObjectId, required: true })
  [BlockProperties.sectionId]: string;

  @Prop({ type: Number, required: true })
  [BlockProperties.row]: number;

  @Prop({ type: Number, required: true })
  [BlockProperties.col]: number;

  @Prop({ type: String, enum: BlockTypes, required: true })
  [BlockProperties.type]: BlockTypes;

  @Prop({ type: Types.ObjectId, ref: ModelNames.Seat, required: false })
  [BlockProperties.seatId]?: string;

  @Prop({ type: Object, required: false })
  [BlockProperties.aisles]?: Aisles;

  @Prop({ type: Object, required: false })
  [BlockProperties.door]?: Door;
}

export type BlockDocument = Block & Document;

export const BlockSchema = SchemaFactory.createForClass(Block);

// Validators
BlockSchema.path(BlockProperties.row).validate(function (value) {
  return value >= 0;
});
BlockSchema.path(BlockProperties.col).validate(function (value) {
  return value >= 0;
});

// Virtuals
BlockSchema.virtual(BlockProperties.seat, {
  ref: ModelNames.Seat,
  localField: BlockProperties.seatId,
  foreignField: '_id',
  justOne: true,
});
