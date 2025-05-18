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
        const host = configService.get<string>('DB_HOST') || 'localhost';
        const port = configService.get<number>('DB_PORT') || 27017;
        const dbName = configService.get<string>('DB_NAME') || 'weatherAPI';

        const uri = `mongodb://${host}:${port}/${dbName}`;

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
