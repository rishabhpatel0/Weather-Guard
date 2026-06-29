
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class WeatherService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private telegramService: TelegramService,
  ) {}

  // Get current weather
  async getWeather(city: string) {
    const apiKey =
      this.configService.get<string>('WEATHER_API_KEY');

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const response = await axios.get(url);

    return response.data;
  }

  // Send alerts only for bad weather
  async sendWeatherAlerts(city: string) {
    const weather = await this.getWeather(city);

    const condition =
      weather.current.condition.text.toLowerCase();

    if (
      !condition.includes('rain') &&
      !condition.includes('storm') &&
      !condition.includes('snow')
    ) {
      console.log('No severe weather. Alert not sent.');

      return {
        success: false,
        message: 'No severe weather.',
      };
    }

    const users =
      await this.usersService.getApprovedUsers();

    const message = `
⚠️ Weather Alert

📍 ${weather.location.name}

🌧 Condition: ${weather.current.condition.text}

🌡 Temperature: ${weather.current.temp_c}°C

Please stay safe!
`;

    for (const user of users) {
      await this.telegramService.sendMessage(
        user.telegramChatId,
        message,
      );
    }

    console.log(
      `Weather alert sent to ${users.length} users.`,
    );

    return {
      success: true,
      users: users.length,
    };
  }

  // Automatic weather check every minute
  @Cron("*/1 * * * *")
  async automaticWeatherCheck() {
    const city =
      this.configService.get<string>("WEATHER_CITY") || "Delhi";
  
    console.log(`Checking weather for ${city}...`);
  
    await this.sendWeatherAlerts(city);
  }
}   
