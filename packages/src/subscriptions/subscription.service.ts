import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { Subscription } from './schemas/subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(@InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>) {}

  async subscribe(subscribeDto: CreateSubscriptionDto) {
    const subscription = new this.subscriptionModel({ ...subscribeDto, confirmed: false });

    try {
      await subscription.save();
      //use jwt tokens and send a confirm url in email
      return;
    } catch (err) {
      if (err.code === 11000) throw new ConflictException('Email already subscribed');
      else throw err;
    }
  }

  confirm(token: string) {
    //handle jwt token and update the document
    return 'Confirming';
  }

  unsubscribe(token: string) {
    //handle jwt token and delete the document
    return 'Unsubscribing';
  }
}
