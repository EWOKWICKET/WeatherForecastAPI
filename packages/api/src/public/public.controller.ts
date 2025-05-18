import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('weatherapi.app')
export class PublicController {
  @Get('weather')
  weatherHtml(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', '..', 'public', 'current-weather.html'));
  }

  @Get('subscribe')
  subscribeHtml(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', '..', 'public', 'subscribe.html'));
  }
}
