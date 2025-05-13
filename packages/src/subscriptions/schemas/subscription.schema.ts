import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Subscription {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  frequency: string;

  @Prop({ required: true })
  confirmed: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

// SubscriptionSchema.set('toJSON', {
//   transform: (_doc, _ret) => {
//     delete _ret._id;
//     delete _ret.__v;
//     return {
//       email: _ret.email,
//       city: _ret.city,
//       frequency: _ret.frequency,
//     };
//   },
// });
