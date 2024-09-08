import { Inject, Injectable } from '@nestjs/common';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { DataSource } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) { }

  async findAll(): Promise<Schedule[]> {
    return await this.dataSource
      .getRepository(Schedule)
      .createQueryBuilder('schedule')
      .orderBy("schedule.order", "ASC")
      .getMany();
  }

  async findOne(weekDay: string): Promise<Schedule> {
    return await this.dataSource
      .getRepository(Schedule)
      .createQueryBuilder('schedule')
      .where("schedule.weekDay = :weekDay", { weekDay: weekDay })
      .getOne();
  }

  async update(weekDay: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    await this.dataSource
      .createQueryBuilder()
      .update(Schedule)
      .set(updateScheduleDto)
      .where("weekDay = :weekDay", { weekDay: weekDay })
      .execute();
    return this.findOne(weekDay);
  }
}