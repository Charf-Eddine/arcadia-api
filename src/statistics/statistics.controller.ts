import { Controller, Param, Patch, Get } from '@nestjs/common';
import { Animal } from './animals.schema';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Patch(':name/increment-consultation')
  async incrementConsultation(@Param('name') encodedName: string): Promise<Animal> {
    const name = decodeURIComponent(encodedName); // Décodage du nom
    return this.statisticsService.incrementConsultation(name);
  }

  @Get('most-popular-animals')
  async getMostPopularAnimals(): Promise<Animal[]> {
    return this.statisticsService.getMostPopularAnimals();
  }
}