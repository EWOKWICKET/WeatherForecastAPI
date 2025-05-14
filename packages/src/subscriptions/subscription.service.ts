import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { Subscription } from './schemas/subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>,
    private readonly mailService: MailService,
  ) {}

  async subscribe(subscribeDto: CreateSubscriptionDto) {
    const subscription = new this.subscriptionModel({ ...subscribeDto, confirmed: false });

    try {
      const savedSubscription = await subscription.save();
      await this.mailService.sendEmail({
        to: savedSubscription.email,
        token: savedSubscription._id,
      });
      return;
    } catch (err) {
      if (subscription._id) {
        await this.subscriptionModel.findByIdAndDelete(subscription._id);
      }

      if (err.code === 11000) throw new ConflictException('Email already subscribed');
      else throw err;
    }
  }

  async confirm(token: string) {
    const updated = await this.subscriptionModel.findByIdAndUpdate(token, { confirmed: true }).exec();
    if (!updated) throw new NotFoundException('Token Not Found');
  }

  async unsubscribe(token: string) {
    const deleted = await this.subscriptionModel.findByIdAndDelete(token);
    if (!deleted) throw new NotFoundException('Token Not Found');
  }
}
