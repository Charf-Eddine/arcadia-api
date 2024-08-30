import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { Habitat } from './entities/habitat.entity';

@ApiTags("Habitats")
@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) { }

  // Route pour créer un nouveau habitat
  @ApiCreatedResponse({
    description: "Habitat successfully created.",
    type: InsertResult,
  })

  @Post()
  create(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatsService.create(createHabitatDto);
  }

  // Route pour récupérer la liste des habitats
  @ApiOkResponse({ description: "Habitats successfully retrieved.", type: [Habitat] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })

  @Get()
  findAll(): Promise<Habitat[]> {
    return this.habitatsService.findAll();
  }

  // Route pour récupérer un habitat par son ID
  @ApiOkResponse({ description: "Habitat successfully retrieved.", type: Habitat })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Habitat> {
    return this.habitatsService.findOne(+id);
  }

  // Route pour mettre à jour un habitat par son ID
  @ApiCreatedResponse({
    description: "Habitat successfully updated.",
    type: Habitat,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto): Promise<Habitat> {
    return this.habitatsService.update(+id, updateHabitatDto);
  }

  // Route pour supprimer un habitat par son ID
  @ApiOkResponse({ description: "Habitat successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatsService.remove(+id);
  }
}
