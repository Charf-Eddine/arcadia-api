import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { VeterinaryReviewsService } from './veterinary-reviews.service';
import { CreateVeterinaryReviewDto } from './dto/create-veterinary-review.dto';
import { UpdateVeterinaryReviewDto } from './dto/update-veterinary-review.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { VeterinaryReview } from './entities/veterinary-review.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Veterinary reviews")
@Controller('veterinary-reviews')
export class VeterinaryReviewsController {
  constructor(
    private readonly veterinaryReviewsService: VeterinaryReviewsService,
    private readonly jwtService: JwtService
  ) {}

  @ApiOperation({ summary: 'Créer un avis du vétérinaire' })
  @ApiCreatedResponse({
    description: "Review successfully created.",
    type: InsertResult,
  })
  @Post()
  create(@Body() createVeterinaryReviewDto: CreateVeterinaryReviewDto): Promise<InsertResult> {
    return this.veterinaryReviewsService.create(createVeterinaryReviewDto);
  }

  @ApiOperation({ summary: 'Récupérer la liste des avis des vétérinaires' })
  @ApiOkResponse({ description: "Reviews successfully retrieved.", type: [VeterinaryReview] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })   
  @Get()
  findAll(): Promise<VeterinaryReview[]> {
    return this.veterinaryReviewsService.find();
  }

  @ApiOperation({ summary: 'Récupérer la liste des avis du vétérinaire' })
  @ApiOkResponse({ description: "Reviews successfully retrieved.", type: [VeterinaryReview] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })   
  @Get('find-by-user')
  async findByUser(@Req() request): Promise<VeterinaryReview[]> {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Invalid or missing Bearer token");
    }
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    const userId = decodedToken.sub;

    return this.veterinaryReviewsService.find({userId: userId});
  }

  @ApiOperation({ summary: 'Récupérer un avis du vétérinaire par son ID' })
  @ApiOkResponse({ description: "Review successfully retrieved.", type: VeterinaryReview })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<VeterinaryReview> {
    return this.veterinaryReviewsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Mettre à jour un avis du vétérinaire par son ID' })
  @ApiCreatedResponse({
    description: "Review successfully updated.",
    type: VeterinaryReview,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinaryReviewDto: UpdateVeterinaryReviewDto): Promise<VeterinaryReview> {
    return this.veterinaryReviewsService.update(+id, updateVeterinaryReviewDto);
  }

  @ApiOperation({ summary: 'Supprimer un avis du vétérinaire par son ID' })
  @ApiOkResponse({ description: "Review successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinaryReviewsService.remove(+id);
  }
}