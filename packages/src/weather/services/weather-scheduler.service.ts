import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { Subscription } from 'src/subscriptions/schemas/subscription.schema';
import { SendUpdatesOptions } from '../config/send-updates.options';
import { WeatherApiService } from './weather-api.service';

@Injectable()
export class WeatherSchedulerService {
  constructor(
    @InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>,
    private readonly mailService: MailService,
    private readonly weatherApiService: WeatherApiService,
  ) {}

  @Cron('0 * * * *') // every hour(10, 11, 12, ...)
  private async sendHourlyUpdates() {
    console.log('Sending hourly updates...');
    this.sendUpdates({ frequency: 'hourly', subject: 'Hourly weather update' });
  }

  @Cron('0 8 * * *') // every day at 8am
  private async sendDailyUpdates() {
    console.log('Sending daily updates...');
    this.sendUpdates({ frequency: 'daily', subject: 'Daily weather update' });
  }

  private async sendUpdates({ frequency, subject }: SendUpdatesOptions) {
    const subscriptions = await this.subscriptionModel.find({ confirmed: true, frequency });
    // const subscriptions = []; //temporary

    for (const subscription of subscriptions) {
      const weather = await this.weatherApiService.getCurrentWeather(subscription.city);

      await this.mailService.sendUpdateEmail({
        to: subscription.email,
        subject,
        data: {
          ...weather,
          city: subscription.city,
        },
      });
    }
  }
}
