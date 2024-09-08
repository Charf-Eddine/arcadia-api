import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Schedule } from './entities/schedule.entity';

@ApiTags("Schedules")
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOperation({ summary: 'Récupérer les horaires de la semaine' })
  @ApiOkResponse({ description: "Schedules successfully retrieved.", type: [Schedule] })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })   
  @Get()
  findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @ApiOperation({ summary: "Récupérer les horaires d'une journée" })
  @ApiOkResponse({ description: "Schedule successfully retrieved.", type: Schedule })
  @ApiBadRequestResponse({ description: "Param is wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })  
  @Get(':weekDay')
  findOne(@Param('weekDay') weekDay: string): Promise<Schedule> {
    return this.schedulesService.findOne(weekDay);
  }

  @ApiOperation({ summary: "Mettre les horaires d'une journée" })
  @ApiOkResponse({
    description: "Schedule successfully updated.",
    type: Schedule,
  })
  @ApiBadRequestResponse({ description: "Params are wrong." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Patch(':weekDay')
  update(@Param('weekDay') weekDay: string, @Body() updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    return this.schedulesService.update(weekDay, updateScheduleDto);
  }
}