import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from 'src/subscriptions/schemas/subscription.schema';
import { DatabaseMigration } from './database.migration';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('DB_URI');
        if (!uri) throw new Error('DB_URI is undefined');
        return { uri };
      },
    }),
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
    ]),
  ],
  providers: [DatabaseService, DatabaseMigration],
  exports: [DatabaseService, DatabaseMigration],
})
export class DatabaseModule {}
