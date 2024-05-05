import { FareTypeProperties } from '@libs/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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
export class FareType {
  @Prop({ type: Types.ObjectId, ref: Show.name, required: true })
  [FareTypeProperties.showId]: string;

  @Prop({ type: String, required: true })
  [FareTypeProperties.title]: string;

  @Prop({ type: String, required: false })
  [FareTypeProperties.displayColor]: string;

  @Prop({ type: Number, required: true })
  [FareTypeProperties.price]: number;

  @Prop({ type: String, required: false })
  [FareTypeProperties.description]: string;

  @Prop({ type: String, required: false })
  [FareTypeProperties.note]: string;
}

export type FareTypeDocument = FareType & Document;

export const FareTypeSchema = SchemaFactory.createForClass(FareType);

// Indexes
FareTypeSchema.index(
  {
    [FareTypeProperties.showId]: 1,
    [FareTypeProperties.title]: 1,
  },
  {
    unique: true,
  }
);

// Virtuals
FareTypeSchema.virtual(FareTypeProperties.show, {
  ref: Show.name,
  localField: FareTypeProperties.showId,
  foreignField: '_id',
  justOne: true,
});
