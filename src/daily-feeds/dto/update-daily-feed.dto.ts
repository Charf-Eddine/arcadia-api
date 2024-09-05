import { PartialType } from '@nestjs/swagger';
import { CreateDailyFeedDto } from './create-daily-feed.dto';

export class UpdateDailyFeedDto extends PartialType(CreateDailyFeedDto) {}
