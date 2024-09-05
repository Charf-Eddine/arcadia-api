import { PartialType } from '@nestjs/swagger';
import { CreateVeterinaryReviewDto } from './create-veterinary-review.dto';

export class UpdateVeterinaryReviewDto extends PartialType(CreateVeterinaryReviewDto) {}
