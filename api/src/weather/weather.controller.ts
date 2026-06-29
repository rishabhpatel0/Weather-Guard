import {
    Controller,
    Get,
    Post,
    Body,
    Query,
  } from "@nestjs/common";
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query('city') city: string) {
    return this.weatherService.getWeather(city);
  }
  @Post("send-alerts")
sendAlerts(@Body() body: { city: string }) {
  return this.weatherService.sendWeatherAlerts(body.city);
}
}  