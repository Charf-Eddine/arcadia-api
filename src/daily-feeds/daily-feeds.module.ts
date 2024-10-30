import { Module } from '@nestjs/common';
import { DailyFeedsService } from './daily-feeds.service';
import { DailyFeedsController } from './daily-feeds.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule],
  controllers: [DailyFeedsController],
  providers: [DailyFeedsService, JwtService, ConfigService],
  exports: [DailyFeedsService],
})
export class DailyFeedsModule {}