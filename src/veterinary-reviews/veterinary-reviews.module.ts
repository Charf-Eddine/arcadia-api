import { Module } from '@nestjs/common';
import { VeterinaryReviewsService } from './veterinary-reviews.service';
import { VeterinaryReviewsController } from './veterinary-reviews.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [VeterinaryReviewsController],
  providers: [VeterinaryReviewsService, JwtService, ConfigService],
  exports: [VeterinaryReviewsService],
})
export class VeterinaryReviewsModule {}