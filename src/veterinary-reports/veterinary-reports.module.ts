import { Module } from '@nestjs/common';
import { VeterinaryReportsService } from './veterinary-reports.service';
import { VeterinaryReportsController } from './veterinary-reports.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VeterinaryReportsController],
  providers: [VeterinaryReportsService],
  exports: [VeterinaryReportsService],
})
export class VeterinaryReportsModule { }
