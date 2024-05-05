import {
  SeatProperties,
  SeatStatuses,
  SectionProperties,
  ShowProperties,
  ShowStatuses,
  ShowTypes,
} from '@libs/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Section } from '../../section/entities/section.entity';
import { Seat } from '../../seat/entities/seat.entity';
import { Document } from 'mongoose';
import moment from 'moment';

export type ShowDocument = Show & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Show {
  @Prop({ type: String, required: true })
  [ShowProperties.title]: string;

  @Prop({ type: String, required: false })
  [ShowProperties.logo]: string;

  @Prop({ type: String, required: false })
  [ShowProperties.description]: string;

  @Prop({ type: String, required: false })
  [ShowProperties.slogan]: string;

  @Prop({ type: ShowTypes, required: false })
  [ShowProperties.types]: ShowTypes;

  @Prop({ type: Date, required: true })
  [ShowProperties.startDate]: Date;

  @Prop({ type: Date, required: true })
  [ShowProperties.endDate]: Date;

  @Prop({ type: Number, required: true })
  [ShowProperties.startTime]: number;

  @Prop({ type: Number, required: true })
  [ShowProperties.endTime]: number;

  @Prop({ type: String, required: true })
  [ShowProperties.location]: string;

  @Prop({ type: Date, required: true })
  [ShowProperties.startBookingDate]: Date;

  @Prop({ type: Date, required: true })
  [ShowProperties.endBookingDate]: Date;

  @Prop({ type: Number, required: true })
  [ShowProperties.startBookingTime]: number;

  @Prop({ type: Number, required: true })
  [ShowProperties.endBookingTime]: number;

  @Prop({ type: ShowStatuses, required: true })
  [ShowProperties.status]: ShowStatuses;
}

export const ShowSchema = SchemaFactory.createForClass(Show);

// Validators
ShowSchema.path(ShowProperties.endDate).validate(function (value) {
  return this[ShowProperties.startDate] <= value;
});

ShowSchema.path(ShowProperties.endTime).validate(function (value) {
  return (
    moment(this[ShowProperties.startDate])
      .add(this[ShowProperties.startTime])
      .toDate() < moment(this[ShowProperties.endDate]).add(value).toDate()
  );
});

ShowSchema.path(ShowProperties.endBookingDate).validate(function (value) {
  return this[ShowProperties.startBookingDate] <= value;
});

ShowSchema.path(ShowProperties.endBookingTime).validate(function (value) {
  return (
    moment(this[ShowProperties.startBookingDate])
      .add(this[ShowProperties.startBookingTime])
      .toDate() <
    moment(this[ShowProperties.endBookingDate]).add(value).toDate()
  );
});

// Virtuals
ShowSchema.virtual(ShowProperties.isFull).get(function () {
  return false;
});

ShowSchema.virtual(ShowProperties.seatNumber, {
  ref: Seat.name,
  localField: '_id',
  foreignField: SeatProperties.showId,
  count: true,
});

ShowSchema.virtual(ShowProperties.remainingSeatNumber, {
  ref: Seat.name,
  localField: '_id',
  foreignField: SeatProperties.showId,
  match: { [SeatProperties.status]: SeatStatuses.Available },
  count: true,
});

ShowSchema.virtual(ShowProperties.sections, {
  ref: Section.name,
  localField: '_id',
  foreignField: SectionProperties.showId,
});
