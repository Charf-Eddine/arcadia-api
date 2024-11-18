import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { DailyFeedsService } from './daily-feeds.service';
import { CreateDailyFeedDto } from './dto/create-daily-feed.dto';
import { UpdateDailyFeedDto } from './dto/update-daily-feed.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { DailyFeed } from './entities/daily-feed.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { jwtConstants } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Daily feeds")
@Controller('daily-feeds')
export class DailyFeedsController {
  constructor(
    private readonly dailyFeedsService: DailyFeedsService,
    private readonly jwtService: JwtService
  ) {}

  @ApiOperation({ summary: "Créer un rapport de l'alimentation quotidienne" })
  @ApiCreatedResponse({
    description: "Daily feed successfully created.",
    type: InsertResult,
  })
  @Post()
  create(@Body() createDailyFeedDto: CreateDailyFeedDto): Promise<InsertResult> {
    return this.dailyFeedsService.create(createDailyFeedDto);
  }

  @ApiOperation({ summary: "Récupérer la liste des rapports de l'alimentation quotidienne" })
  @ApiOkResponse({ description: "Reports successfully retrieved.", type: [DailyFeed] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })   
  @Get()
  findAll() {
    return this.dailyFeedsService.find();
  }

  @ApiOperation({ summary: 'Récupérer la liste des rapports de l\'alimentation quotidienne de l\employé' })
  @ApiOkResponse({ description: "Reports successfully retrieved.", type: [DailyFeed] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })   
  @Get('find-by-user')
  async findByUser(@Req() request): Promise<DailyFeed[]> {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Invalid or missing Bearer token");
    }
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    const userId = decodedToken.sub;

    return this.dailyFeedsService.find({userId: userId});
  }
  
  @ApiOperation({ summary: "Récupérer un rapport de l'alimentation quotidienne par son ID" })
  @ApiOkResponse({ description: "Report successfully retrieved.", type: DailyFeed })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<DailyFeed> {
    return this.dailyFeedsService.findOne(id);
  }

  @ApiOperation({ summary: "Mettre à jour un rapport de l'alimentation quotidienne par son ID" })
  @ApiCreatedResponse({
    description: "Report successfully updated.",
    type: DailyFeed,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyFeedDto: UpdateDailyFeedDto): Promise<DailyFeed> {
    return this.dailyFeedsService.update(id, updateDailyFeedDto);
  }

  @ApiOperation({ summary: "Supprimer un rapport de l'alimentation quotidienne par son ID" })
  @ApiOkResponse({ description: "Report successfully deleted." })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyFeedsService.remove(id);
  }
}