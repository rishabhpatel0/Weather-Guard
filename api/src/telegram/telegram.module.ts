import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TelegramService } from './telegram.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule, 
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}