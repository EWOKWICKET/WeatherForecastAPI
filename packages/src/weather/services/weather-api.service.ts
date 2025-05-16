import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrentWeatherResponseDto } from '../dtos/current-weather-response.dto';

@Injectable()
export class WeatherApiService {
  private api_key;

  constructor() {
    this.api_key = process.env.WEATHER_API_KEY;
  }

  async searchCities(city: string): Promise<string[]> {
    const searchUrl = `http://api.weatherapi.com/v1/search.json?key=${this.api_key}&q=${city}`;

    const response = await fetch(searchUrl);
    const data = await response.json();
    const cities: string[] = data.reduce((cities, cityInfo) => {
      if (!cities.includes(cityInfo.name)) cities.push(cityInfo.name);
      return cities;
    }, []);

    return cities;
  }

  async getCurrentWeather(city: string): Promise<CurrentWeatherResponseDto> {
    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${this.api_key}&q=${city}`;

    const response: Response = await fetch(currentWeatherUrl);
    if (response.status !== 200) throw new BadRequestException('No matching location found.');

    const data = (await response.json()).current;
    const result: CurrentWeatherResponseDto = {
      temperature: data.temp_c,
      humidity: data.humidity,
      description: data.condition.text,
    };

    return result;
  }
}
