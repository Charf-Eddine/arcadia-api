import { Module } from '@nestjs/common';
import { VeterinaryReviewsService } from './veterinary-reviews.service';
import { VeterinaryReviewsController } from './veterinary-reviews.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VeterinaryReviewsController],
  providers: [VeterinaryReviewsService],
  exports: [VeterinaryReviewsService],
})
export class VeterinaryReviewsModule { }