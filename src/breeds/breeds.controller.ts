import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Breeds")
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @ApiOperation({ summary: 'Créer une nouvelle race' })
  @ApiCreatedResponse({
    description: "Breed successfully created.",
    type: InsertResult,
  })
  @Post()
  create(@Body() createBreedDto: CreateBreedDto): Promise<InsertResult> {
    return this.breedsService.create(createBreedDto);
  }

  @ApiOperation({ summary: 'Récupérer la liste des races' })
  @ApiOkResponse({ description: "Breeds successfully retrieved.", type: [Breed] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get()
  findAll(): Promise<Breed[]> {
    return this.breedsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer une race par son ID' })
  @ApiOkResponse({ description: "Breed successfully retrieved.", type: Breed })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Breed> {
    return this.breedsService.findOne(id);
  }

  @ApiOperation({ summary: 'Mettre à jour une race par son ID' })
  @ApiCreatedResponse({
    description: "Breed successfully updated.",
    type: Breed,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto): Promise<Breed> {
    return this.breedsService.update(id, updateBreedDto);
  }

  @ApiOperation({ summary: 'Supprimer une race par son ID' })
  @ApiOkResponse({ description: "Breed successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.breedsService.remove(id);
  }
}