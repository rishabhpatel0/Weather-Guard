import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { WeatherModule } from './weather/weather.module';
import { TelegramModule } from './telegram/telegram.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CommonModule } from './common/common.module';
import { ScheduleModule } from "@nestjs/schedule";  


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
  ScheduleModule.forRoot(),

  MongooseModule.forRoot(process.env.MONGODB_URI!),


  AuthModule, UsersModule, AdminModule, WeatherModule, TelegramModule, SchedulerModule, CommonModule,TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
