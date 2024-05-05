import { SeatProperties, SeatStatuses } from '@libs/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FareType } from '../../fare-type/entities/fare-type.entity';
import { Show } from '../../show/entities/show.entity';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Seat {
  @Prop({ type: Types.ObjectId, required: true })
  [SeatProperties.showId]: string;

  @Prop({ type: Types.ObjectId, required: true })
  [SeatProperties.blockId]: string;

  @Prop({ type: Types.ObjectId, required: true })
  [SeatProperties.sectionId]: string;

  @Prop({ type: Number, required: true })
  [SeatProperties.row]: number;

  @Prop({ type: Number, required: true })
  [SeatProperties.col]: number;

  @Prop({ type: String, required: true })
  [SeatProperties.code]: string;

  @Prop({ type: String, enum: SeatStatuses, required: true })
  [SeatProperties.status]: SeatStatuses;

  @Prop({ type: Types.ObjectId, required: true })
  [SeatProperties.fareTypeId]: string;
}

export type SeatDocument = Seat & Document;

export const SeatSchema = SchemaFactory.createForClass(Seat);

// Indexes
SeatSchema.index(
  {
    [SeatProperties.showId]: 1,
    [SeatProperties.sectionId]: 1,
    [SeatProperties.blockId]: 1,
  },
  {
    unique: true,
  }
);

// Virtuals
SeatSchema.virtual(SeatProperties.fareType, {
  ref: FareType.name,
  localField: SeatProperties.fareTypeId,
  foreignField: '_id',
  justOne: true,
});

SeatSchema.virtual(SeatProperties.show, {
  ref: Show.name,
  localField: SeatProperties.showId,
  foreignField: '_id',
  justOne: true,
});
