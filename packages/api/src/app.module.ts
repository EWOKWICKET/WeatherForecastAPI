import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { HtmlPagesModule } from './html-pages/html-pages.module';
import { MailModule } from './mail/mail.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    SubscriptionModule,
    MailModule,
    WeatherModule,
    HtmlPagesModule,
  ],
})
export class AppModule {}
