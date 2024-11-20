import { Controller, Param, Patch, Get } from '@nestjs/common';
import { Animal } from './animals.schema';
import { StatisticsService } from './statistics.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Statistics")
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({ summary: 'Incrémenter le nombre de consultations par animal' })
  @ApiCreatedResponse({
    description: "Animal successfully updated.",
    type: Animal,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Patch(':name/increment-consultation')
  async incrementConsultation(@Param('name') encodedName: string): Promise<Animal> {
    const name = decodeURIComponent(encodedName); // Décodage du nom
    return this.statisticsService.incrementConsultation(name);
  }

  @ApiOperation({ summary: 'Récupérer la liste des animaux classés par ordre de popularité' })
  @ApiOkResponse({ description: "Animals successfully retrieved.", type: [Animal] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get('most-popular-animals')
  async getMostPopularAnimals(): Promise<Animal[]> {
    return this.statisticsService.getMostPopularAnimals();
  }
}