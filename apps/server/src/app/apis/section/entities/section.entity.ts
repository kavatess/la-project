import { SeatProperties, SectionProperties } from '@libs/models';
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
export class Section {
  @Prop({ type: Types.ObjectId, ref: ModelNames.Show, required: true })
  [SectionProperties.showId]: string;

  @Prop({ type: String, required: true })
  [SectionProperties.title]: string;

  @Prop({ type: Number, required: true })
  [SectionProperties.maxCol]: number;

  @Prop({ type: Number, required: true })
  [SectionProperties.maxRow]: number;

  @Prop({ type: Boolean, required: false })
  [SectionProperties.useRowIndex]: boolean;

  @Prop({ type: Types.Array, required: false })
  [SectionProperties.rowIndexes]: string[];

  @Prop({ type: Boolean, required: false })
  [SectionProperties.indexReversed]: boolean;

  @Prop({ type: Number, required: false })
  [SectionProperties.index]: number;
}

export type SectionDocument = Section & Document;

export const SectionSchema = SchemaFactory.createForClass(Section);

// Virtuals

SectionSchema.virtual(SectionProperties.seatNumber, {
  ref: ModelNames.Seat,
  localField: '_id',
  foreignField: SeatProperties.sectionId,
  count: true,
});

SectionSchema.virtual(SectionProperties.seatMap, {
  ref: ModelNames.Seat,
  localField: '_id',
  foreignField: SeatProperties.sectionId,
});
