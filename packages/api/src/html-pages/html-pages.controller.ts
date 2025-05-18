import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('weatherapi.app')
export class HtmlPagesController {
  private PUBLIC_DIR = join(__dirname, '..', '..', '..', 'public');

  @Get('')
  redirectToMain(@Res() res: Response) {
    res.redirect('/subscribe');
  }

  @Get('weather')
  weatherHtml(@Res() res: Response): void {
    return res.sendFile('current-weather.html', { root: this.PUBLIC_DIR });
  }

  @Get('subscribe')
  subscribeHtml(@Res() res: Response): void {
    return res.sendFile('subscribe.html', { root: this.PUBLIC_DIR });
  }
}
