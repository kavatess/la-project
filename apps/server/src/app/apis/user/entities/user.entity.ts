import { UserGenders, UserProperties, UserRoles } from '@libs/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User &
  Document & {
    [UserProperties.fullName]: string;
  };

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  [UserProperties.firstName]: string;

  @Prop({ type: String, required: true })
  [UserProperties.lastName]: string;

  @Prop({ type: String, required: true, unique: true })
  [UserProperties.phone]: string;

  @Prop({ type: String, required: false })
  [UserProperties.email]: string;

  @Prop({ type: String, required: false })
  [UserProperties.address]: string;

  @Prop({ type: UserGenders, required: false })
  [UserProperties.sex]: UserGenders;

  @Prop({ type: Date, required: false })
  [UserProperties.dob]: Date;

  @Prop({ type: UserRoles, required: true })
  [UserProperties.role]: UserRoles;

  @Prop({ type: String, required: false })
  [UserProperties.portrait]: string;

  @Prop({ type: String, required: true })
  [UserProperties.password]: string;

  @Prop({ type: String, required: true })
  [UserProperties.accountName]: string;

  @Prop({ type: String, required: false })
  [UserProperties.note]: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Virtuals
UserSchema.virtual(UserProperties.fullName).get(function (this: User) {
  return `${this[UserProperties.firstName]} ${this[UserProperties.lastName]}`;
});
