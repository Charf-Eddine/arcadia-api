import { Inject, Injectable } from '@nestjs/common';
import { CreateDailyFeedDto } from './dto/create-daily-feed.dto';
import { UpdateDailyFeedDto } from './dto/update-daily-feed.dto';
import { DataSource, InsertResult } from 'typeorm';
import { DailyFeed } from './entities/daily-feed.entity';

@Injectable()
export class DailyFeedsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) {}
  
  async create(createDailyFeedDto: CreateDailyFeedDto): Promise<InsertResult> {
    return await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(DailyFeed)
    .values(createDailyFeedDto)
    .execute();
  }

  async find(filters : any = null): Promise<DailyFeed[]> {
    let qb = this.dataSource
    .getRepository(DailyFeed)
    .createQueryBuilder('dailyFeed')
    .leftJoin("dailyFeed.user", "user")
    .addSelect(["user.id", "user.firstname", "user.lastname"])
    .leftJoin("dailyFeed.animal", "animal")
    .addSelect(["animal.id", "animal.name"])

    if (filters && filters.userId) {
      qb.where("dailyFeed.userId = :userId", { userId: filters.userId })
    }

    return await qb.orderBy("dailyFeed.passageDate", "DESC").getMany();
  }

  async findOne(id: number): Promise<DailyFeed> {
    return await this.dataSource
      .getRepository(DailyFeed)
      .createQueryBuilder('dailyFeed')
      .leftJoin("dailyFeed.user", "user")
      .addSelect(["user.id", "user.firstname", "user.lastname"])
      .leftJoin("dailyFeed.animal", "animal")
      .addSelect(["animal.id", "animal.name"])
      .where("dailyFeed.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateDailyFeedDto: UpdateDailyFeedDto): Promise<DailyFeed> {
    await this.dataSource
    .createQueryBuilder()
    .update(DailyFeed)
    .set(updateDailyFeedDto)
    .where("id = :id", { id: id })
    .execute();
    return  this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(DailyFeed)
      .where("id = :id", { id: id })
      .execute();
  }
}