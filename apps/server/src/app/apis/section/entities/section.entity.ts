import { SeatProperties, SectionProperties } from '@libs/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Show } from '../../show/entities/show.entity';
import { Seat } from '../../seat/entities/seat.entity';

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
  @Prop({ type: Types.ObjectId, ref: Show.name, required: true })
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
  ref: Seat.name,
  localField: '_id',
  foreignField: SeatProperties.sectionId,
  count: true,
});

SectionSchema.virtual(SectionProperties.seatMap, {
  ref: Seat.name,
  localField: '_id',
  foreignField: SeatProperties.sectionId,
});
