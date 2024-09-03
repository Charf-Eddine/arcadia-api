import { PartialType } from '@nestjs/swagger';
import { CreateVeterinaryReportDto } from './create-veterinary-report.dto';

export class UpdateVeterinaryReportDto extends PartialType(CreateVeterinaryReportDto) { }
