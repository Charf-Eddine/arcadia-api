import { Module } from '@nestjs/common';
import { VeterinaryReportsService } from './veterinary-reports.service';
import { VeterinaryReportsController } from './veterinary-reports.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule],
  controllers: [VeterinaryReportsController],
  providers: [VeterinaryReportsService, JwtService, ConfigService],
  exports: [VeterinaryReportsService],
})
export class VeterinaryReportsModule {}