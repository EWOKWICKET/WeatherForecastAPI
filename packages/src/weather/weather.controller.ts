import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './services/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getCurrentWeather(@Query('city') city: string) {
    return this.weatherService.getCurrentWeather(city);
  }
}
