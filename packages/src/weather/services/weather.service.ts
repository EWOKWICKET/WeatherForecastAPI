import { Injectable } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherApiService: WeatherApiService) {}

  async getCurrentWeather(city: string) {
    return await this.weatherApiService.getCurrentWeather(city);
  }

  async cityExists(city: string) {
    return await this.weatherApiService.cityExists(city);
  }
}
