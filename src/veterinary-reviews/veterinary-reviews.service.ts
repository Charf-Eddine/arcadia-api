import { Inject, Injectable } from '@nestjs/common';
import { CreateVeterinaryReviewDto } from './dto/create-veterinary-review.dto';
import { UpdateVeterinaryReviewDto } from './dto/update-veterinary-review.dto';
import { DataSource, InsertResult } from 'typeorm';
import { VeterinaryReview } from './entities/veterinary-review.entity';

@Injectable()
export class VeterinaryReviewsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) {}
  
  async create(createVeterinaryReviewDto: CreateVeterinaryReviewDto): Promise<InsertResult> {
    return await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(VeterinaryReview)
    .values(createVeterinaryReviewDto)
    .execute();
  }

  async find(filters : any = null): Promise<VeterinaryReview[]> {
    let qb = this.dataSource
      .getRepository(VeterinaryReview)
      .createQueryBuilder('veterinaryReview')
      .leftJoin("veterinaryReview.user", "user")
      .addSelect(["user.id", "user.firstname", "user.lastname"])
      .leftJoin("veterinaryReview.habitat", "habitat")
      .addSelect(["habitat.id", "habitat.name"])

      if (filters && filters.userId) {
        qb.where("veterinaryReview.userId = :userId", { userId: filters.userId })
      }

      return await qb.orderBy("veterinaryReview.date", "DESC").getMany();
  }

  async findOne(id: string): Promise<VeterinaryReview> {
    return await this.dataSource
      .getRepository(VeterinaryReview)
      .createQueryBuilder('veterinaryReview')
      .leftJoin("veterinaryReview.user", "user")
      .addSelect(["user.id", "user.firstname", "user.lastname"])
      .leftJoin("veterinaryReview.habitat", "habitat")
      .addSelect(["habitat.id", "habitat.name"])
      .where("veterinaryReview.id = :id", { id: id })
      .getOne();
  }

  async update(id: string, updateVeterinaryReviewDto: UpdateVeterinaryReviewDto): Promise<VeterinaryReview> {
    await this.dataSource
    .createQueryBuilder()
    .update(VeterinaryReview)
    .set(updateVeterinaryReviewDto)
    .where("id = :id", { id: id })
    .execute();
    return  this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(VeterinaryReview)
      .where("id = :id", { id: id })
      .execute();
  }
}