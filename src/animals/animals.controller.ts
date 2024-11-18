import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Animal } from './entities/animal.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags("Animals")
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @ApiOperation({ summary: 'Créer un nouvel animal' })
  @ApiCreatedResponse({
    description: "Animal successfully created.",
    type: Animal,
  })  
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 }
  ]))  
  @Post()
  create(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() createAnimalDto: CreateAnimalDto
  ): Promise<Animal> {
    const imagesData = files.images?.map(file => {
      return { 
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype
      };
    }) || [];

    return this.animalsService.create({
      ...createAnimalDto,
      images: imagesData.length ? imagesData : undefined,
    });
  }

  @ApiOperation({ summary: 'Récupérer la liste des animaux' })
  @ApiOkResponse({ description: "Animals successfully retrieved.", type: [Animal] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get()
  findAll(): Promise<Animal[]> {
    return this.animalsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un animal par son ID' })
  @ApiOkResponse({ description: "Animal successfully retrieved.", type: Animal })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Animal> {
    return this.animalsService.findOne(id);
  }

  @ApiOperation({ summary: 'Mettre à jour un animal par son ID' })
  @ApiCreatedResponse({
    description: "Animal successfully updated.",
    type: Animal,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 }
  ]))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() updateAnimalDto: UpdateAnimalDto
  ): Promise<Animal> {
    const imagesData = files.images?.map(file => {
      return { 
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype
      };
    }) || [];

    return this.animalsService.update(id, {
      ...updateAnimalDto,
      images: imagesData.length ? imagesData : undefined,
    });
  }

  @ApiOperation({ summary: 'Supprimer un animal par son ID' })
  @ApiOkResponse({ description: "Animal successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.animalsService.remove(id);
  }
}