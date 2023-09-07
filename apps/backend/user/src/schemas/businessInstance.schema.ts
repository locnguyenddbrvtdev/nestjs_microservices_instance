import { Schema, Prop } from '@nestjs/mongoose';
import { BUSINESSMODEL, BUSINESSPERMISSION } from '@enums';
import mongoose, { HydratedDocument, Document } from 'mongoose';

export type BusinessInstanceDocument = HydratedDocument<BusinessInstance>;

@Schema()
class Owner extends Document {
  @Prop({
    type: {
      amount: { type: Number, required: true },
      percent: { type: Number, required: true },
    },
    required: true,
  })
  capitalization: {
    amount: number;
    percent: number;
  };
  @Prop({ type: mongoose.Types.ObjectId, ref: 'user-accounts', required: true })
  userId: mongoose.Schema.Types.ObjectId;
}
@Schema()
export class BusinessInstance {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ enum: BUSINESSMODEL, required: true })
  model: BUSINESSMODEL;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'user-accounts', required: true })
  // createdBy: mongoose.Schema.Types.ObjectId;
  createdBy: string;
  @Prop({
    type: [
      { type: mongoose.Types.ObjectId, required: true, ref: 'user-accounts' },
    ],
    default: [],
  })
  manager: mongoose.Schema.Types.ObjectId[];
  @Prop({
    type: [
      { type: mongoose.Types.ObjectId, required: true, ref: 'user-accounts' },
    ],
    default: [],
  })
  allowToRead: mongoose.Schema.Types.ObjectId[];
  @Prop({ type: [Owner], required: true })
  owners: Owner[];
  @Prop({})
  paymentMethod: [];
  @Prop({ type: Date, default: new Date() })
  createdDate: Date;
}

const test: BusinessInstance = {
  name: '',
  model: BUSINESSMODEL['F&B'],
  createdBy: 'sdgsdg',
  manager: [],
  allowToRead: [],
  owners: [],
  paymentMethod: [],
  createdDate: new Date(),
};
