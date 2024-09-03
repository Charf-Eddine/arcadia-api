import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { VisitorReviewsService } from './visitor-reviews.service';
import { CreateVisitorReviewDto } from './dto/create-visitor-review.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { VisitorReview } from './entities/visitor-review.entity';

@ApiTags("Visitor reviews")
@Controller('visitor-reviews')
export class VisitorReviewsController {
  constructor(private readonly visitorReviewsService: VisitorReviewsService) { }

  @ApiOperation({ summary: 'Créer un avis visiteur' })
  @ApiCreatedResponse({
    description: "Review successfully created.",
    type: InsertResult,
  })
  @Post()
  create(@Body() createVisitorReviewDto: CreateVisitorReviewDto): Promise<InsertResult> {
    return this.visitorReviewsService.create(createVisitorReviewDto);
  }

  @ApiOperation({ summary: 'Récupérer la liste de tous les avis visiteurs' })
  @ApiOkResponse({ description: "Reviews successfully retrieved.", type: [VisitorReview] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get()
  findAll(): Promise<VisitorReview[]> {
    return this.visitorReviewsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer la liste des avis visiteurs acceptés' })
  @ApiOkResponse({ description: "Reviews successfully retrieved.", type: [VisitorReview] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get('list/accepted')
  findAcceptedReviews(): Promise<VisitorReview[]> {
    return this.visitorReviewsService.findAcceptedReviews();
  }

  @ApiOperation({ summary: 'Récupérer un avis visiteur par son ID' })
  @ApiOkResponse({ description: "Review successfully retrieved.", type: VisitorReview })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<VisitorReview> {
    return this.visitorReviewsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Accepter un avis visiteur par son ID' })
  @ApiOkResponse({
    description: "Review successfully accepted."
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Post('accept-review/:id')
  @HttpCode(200)
  acceptReview(@Param('id') id: string): Promise<void> {
    return this.visitorReviewsService.acceptReview(+id);
  }

  @ApiOperation({ summary: 'Rejeter un avis visiteur par son ID' })
  @ApiOkResponse({
    description: "Review successfully rejected."
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Post('reject-review/:id')
  @HttpCode(200)
  rejectReview(@Param('id') id: string): Promise<void> {
    return this.visitorReviewsService.rejectReview(+id);
  }
}