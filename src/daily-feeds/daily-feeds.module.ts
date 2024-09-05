import { Module } from '@nestjs/common';
import { DailyFeedsService } from './daily-feeds.service';
import { DailyFeedsController } from './daily-feeds.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DailyFeedsController],
  providers: [DailyFeedsService],
  exports: [DailyFeedsService],
})
export class DailyFeedsModule { }