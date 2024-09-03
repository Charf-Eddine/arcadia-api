import { Module } from '@nestjs/common';
import { VisitorReviewsService } from './visitor-reviews.service';
import { VisitorReviewsController } from './visitor-reviews.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VisitorReviewsController],
  providers: [VisitorReviewsService],
  exports: [VisitorReviewsService],
})

export class VisitorReviewsModule { }


