import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Subscription {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  city: string;

  @Prop({ enum: ['daily', 'hourly'], required: true })
  frequency: 'daily' | 'hourly';

  @Prop({ default: false })
  confirmed: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
