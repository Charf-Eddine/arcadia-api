import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Habitat } from './entities/habitat.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags("Habitats")
@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) {}

  @ApiOperation({ summary: 'Créer un nouveau habitat' })
  @ApiCreatedResponse({
    description: "Habitat successfully created.",
    type: Habitat,
  }) 
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 }
  ]))
  @Post()
  create(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() createHabitatDto: CreateHabitatDto
  ): Promise<Habitat> {
    const imagesData = files && files.images ? files.images?.map(file => {
      return { 
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype
      };
    }) : [];

    return this.habitatsService.create({
      ...createHabitatDto,
      images: imagesData.length ? imagesData : undefined,
    });
  }

  @ApiOperation({ summary: 'Récupérer la liste des habitats' })
  @ApiOkResponse({ description: "Habitats successfully retrieved.", type: [Habitat] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get()
  findAll(): Promise<Habitat[]> {
    return this.habitatsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un habitat par son ID' })
  @ApiOkResponse({ description: "habitat successfully retrieved.", type: Habitat })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Habitat> {
    return this.habitatsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Mettre à jour un habitat par son ID' })
  @ApiCreatedResponse({
    description: "Habitat successfully updated.",
    type: Habitat,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 }
  ]))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() updateHabitatDto: UpdateHabitatDto
  ): Promise<Habitat> {
    const imagesData = files && files.images ? files.images?.map(file => {
      return { 
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype
      };
    }) : [];

    return this.habitatsService.update(+id, {
      ...updateHabitatDto,
      images: imagesData.length ? imagesData : undefined,
    });
  }

  @ApiOperation({ summary: 'Supprimer un habitat par son ID' })
  @ApiOkResponse({ description: "Habitat successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.habitatsService.remove(+id);
  }
}