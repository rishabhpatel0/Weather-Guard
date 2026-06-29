import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.bot = new TelegramBot(
      this.configService.get<string>('TELEGRAM_BOT_TOKEN')!,
      {
        polling: true,
      },
    );

    this.bot.onText(/\/start (.+)/, async (msg, match) => {
      try {
        const userId = match?.[1];

        if (!userId) {
          await this.bot.sendMessage(
            msg.chat.id,
            'Invalid user ID.',
          );
          return;
        }

        const chatId = msg.chat.id.toString();

        console.log('User ID:', userId);
        console.log('Chat ID:', chatId);

        // Link Telegram account with MongoDB user
        await this.usersService.updateTelegramChatId(
          userId,
          chatId,
        );

        // Get current weather
        const city =
          this.configService.get<string>('WEATHER_CITY') || 'Delhi';

        const apiKey =
          this.configService.get<string>('WEATHER_API_KEY');

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        const response = await axios.get(url);

        const weather = response.data;

        const message = `
✅ Telegram connected successfully!

📍 Current Weather

City: ${weather.location.name}

🌡 Temperature: ${weather.current.temp_c}°C

🌤 Condition: ${weather.current.condition.text}

You will now receive automatic weather alerts whenever severe weather is detected.
`;

        await this.bot.sendMessage(chatId, message);
      } catch (error) {
        console.error(error);

        await this.bot.sendMessage(
          msg.chat.id,
          'Something went wrong while connecting your account.',
        );
      }
    });
  }

  async sendMessage(chatId: string, message: string) {
    return this.bot.sendMessage(chatId, message);
  }
}

