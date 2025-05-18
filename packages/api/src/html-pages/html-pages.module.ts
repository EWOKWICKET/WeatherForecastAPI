import { Module } from '@nestjs/common';
import { HtmlPagesController } from './html-pages.controller';

@Module({
  controllers: [HtmlPagesController],
})
export class HtmlPagesModule {}
