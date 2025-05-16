import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WeatherApiService } from '../services/weather-api.service';

describe('WeatherApiService', () => {
  let weatherApiService: WeatherApiService;

  beforeAll(async () => {
    process.env.WEATHER_API_KEY = 'test_key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherApiService],
    }).compile();

    weatherApiService = module.get<WeatherApiService>(WeatherApiService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('searchCities', () => {
    it('should return cities starting with city name argument', async () => {
      const mockResponse = [{ name: 'London' }, { name: 'Londonderry' }, { name: 'Londoko' }];
      const mockResult = ['London', 'Londonderry', 'Londoko'];

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await weatherApiService.searchCities('Londo');

      expect(result).toEqual(mockResult);
      expect(global.fetch).toHaveBeenCalledWith('http://api.weatherapi.com/v1/search.json?key=test_key&q=Londo');
    });

    it('should return an empty array(no cities found)', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      });

      const result = await weatherApiService.searchCities('NoCity');

      expect(result).toEqual([]);
    });
  });

  describe('getCurrentWeather', () => {
    it('should return weather for a city', async () => {
      const mockResponse = {
        current: {
          temp_c: 0,
          humidity: 1,
          condition: {
            text: 'Weather',
          },
        },
      };
      const mockResult = {
        temperature: 0,
        humidity: 1,
        description: 'Weather',
      };

      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await weatherApiService.getCurrentWeather('London');

      expect(result).toEqual(mockResult);
      expect(global.fetch).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=test_key&q=London');
    });

    it('should throw an BadRequestException on incorrect location', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: jest.fn(),
      });

      await expect(weatherApiService.getCurrentWeather('NoCity')).rejects.toThrow(BadRequestException);
    });
  });
});
