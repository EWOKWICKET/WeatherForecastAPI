import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DatabaseMigration } from './database/database.migration';
import { DatabaseService } from './database/database.service';

let server: express.Express;

async function createServer() {
  if (!server) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);

    const app = await NestFactory.create(AppModule, adapter);

    app.setGlobalPrefix('weatherapi.app/api', {
      exclude: [
        { path: 'weatherapi.app/weather', method: RequestMethod.GET },
        { path: 'weatherapi.app/subscribe', method: RequestMethod.GET },
      ],
    });

    app.enableCors();

    const dbService = app.get(DatabaseService);
    await dbService.waitForConnection();

    const dbMigration = app.get(DatabaseMigration);
    await dbMigration.migrateDatabase();

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    server = expressApp;
  }
  return server;
}

export const handler = async (req: Request, res: Response) => {
  const server = await createServer();
  server(req, res);
};
