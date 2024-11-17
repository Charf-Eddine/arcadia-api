import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InsertResult } from 'typeorm';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Services")
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Route pour créer un nouveau service
  @ApiCreatedResponse({
    description: "Service successfully created.",
    type: InsertResult,
  })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto): Promise<InsertResult> {
    return this.servicesService.create(createServiceDto);
  }

  // Route pour récupérer la liste des services
  @ApiOkResponse({ description: "Services successfully retrieved.", type: [Service] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  // Route pour récupérer un service par son ID
  @ApiOkResponse({ description: "Service successfully retrieved.", type: Service })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  // Route pour mettre à jour un service par son ID
  @ApiCreatedResponse({
    description: "Service successfully updated.",
    type: Service,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  // Route pour supprimer un service par son ID
  @ApiOkResponse({ description: "Service successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.servicesService.remove(id);
  }
}