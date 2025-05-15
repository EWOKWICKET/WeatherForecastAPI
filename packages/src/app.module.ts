import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    SubscriptionModule,
    MailModule,
    WeatherModule,
  ],
})
export class AppModule {}
