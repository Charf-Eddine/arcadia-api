import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VeterinaryReportsService } from './veterinary-reports.service';
import { CreateVeterinaryReportDto } from './dto/create-veterinary-report.dto';
import { UpdateVeterinaryReportDto } from './dto/update-veterinary-report.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { VeterinaryReport } from './entities/veterinary-report.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Veterinary reports")
@Controller('veterinary-reports')
export class VeterinaryReportsController {
  constructor(private readonly veterinaryReportsService: VeterinaryReportsService) {}

  @ApiOperation({ summary: 'Créer un rapport du vétérinaire' })
  @ApiCreatedResponse({
    description: "Report successfully created.",
    type: InsertResult,
  })
  @Post()
  create(@Body() createVeterinaryReportDto: CreateVeterinaryReportDto): Promise<InsertResult> {
    return this.veterinaryReportsService.create(createVeterinaryReportDto);
  }

  @ApiOperation({ summary: 'Récupérer la liste des rapports des vétérinaires' })
  @ApiOkResponse({ description: "Reports successfully retrieved.", type: [VeterinaryReport] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })   
  @Get()
  findAll(): Promise<VeterinaryReport[]> {
    return this.veterinaryReportsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer la liste des rapports des vétérinaires pour un animal' })
  @ApiOkResponse({ description: "Reviews successfully retrieved.", type: [VeterinaryReport] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })    
  @Get('by-animal/:animalId')
  findByAnimal(@Param('animalId') animalId: string): Promise<VeterinaryReport[]> {
    return this.veterinaryReportsService.findByAnimal(+animalId);
  }

  @ApiOperation({ summary: 'Récupérer un rapport du vétérinaire par son ID' })
  @ApiOkResponse({ description: "Report successfully retrieved.", type: VeterinaryReport })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<VeterinaryReport> {
    return this.veterinaryReportsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Mettre à jour un rapport du vétérinaire par son ID' })
  @ApiCreatedResponse({
    description: "Report successfully updated.",
    type: VeterinaryReport,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinaryReportDto: UpdateVeterinaryReportDto): Promise<VeterinaryReport> {
    return this.veterinaryReportsService.update(+id, updateVeterinaryReportDto);
  }

  @ApiOperation({ summary: 'Supprimer un service par son ID' })
  @ApiOkResponse({ description: "Report successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinaryReportsService.remove(+id);
  }
}