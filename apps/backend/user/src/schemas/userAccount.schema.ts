import { BUSINESSPERMISSION } from '@enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type UserAccountDocument = HydratedDocument<UserAccount>;

@Schema({ _id: false })
class AccountLink extends Document {
  @Prop({ type: String, default: null })
  googleID: string | null;
  @Prop({ type: String, default: null })
  facebookID: string | null;
}
@Schema({ _id: false })
class Business extends Document {
  @Prop({ enum: BUSINESSPERMISSION, required: true })
  permission: BUSINESSPERMISSION;
  @Prop({ type: mongoose.Types.ObjectId, ref: '', required: true })
  instance: mongoose.Schema.Types.ObjectId;
}
@Schema()
export class UserAccount extends Document {
  @Prop({ type: String, required: true, unique: true })
  username: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;
  @Prop({ type: Date, default: new Date() })
  createdDate: Date;
  @Prop({ type: [Business], default: [] })
  business: Business[];
  @Prop({ type: AccountLink })
  accountLink: AccountLink;
}
export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
UserAccountSchema.pre('save', (next) => {});
