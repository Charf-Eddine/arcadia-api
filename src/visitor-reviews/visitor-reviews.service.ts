import { Inject, Injectable } from '@nestjs/common';
import { CreateVisitorReviewDto } from './dto/create-visitor-review.dto';
import { DataSource } from 'typeorm';
import { VisitorReview } from './entities/visitor-review.entity';

@Injectable()
export class VisitorReviewsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) {}
  
  async create(createVisitorReviewDto: CreateVisitorReviewDto) {
    createVisitorReviewDto.isVisible = false;
    return await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(VisitorReview)
    .values(createVisitorReviewDto)
    .execute();
  }

  async findAll(): Promise<VisitorReview[]> {
    return await this.dataSource
      .getRepository(VisitorReview)
      .createQueryBuilder('visitorReview')
      .orderBy("visitorReview.date", "DESC")
      .getMany();
  }

  async findAcceptedReviews(): Promise<VisitorReview[]> {
    return await this.dataSource
      .getRepository(VisitorReview)
      .createQueryBuilder('visitorReview')
      .where("visitorReview.isVisible = :isVisible", { isVisible: true })
      .orderBy("visitorReview.date", "DESC")
      .getMany();
  }

  async findOne(id: number): Promise<VisitorReview> {
    return await this.dataSource
      .getRepository(VisitorReview)
      .createQueryBuilder('visitorReview')
      .where("visitorReview.id = :id", { id: id })
      .getOne();
  }

  async acceptReview(id: number) : Promise<void> {
    await this.dataSource
    .createQueryBuilder()
    .update(VisitorReview)
    .set({
      isVisible: true
    })
    .where("id = :id", { id: id })
    .execute();
  }

  async rejectReview(id: number) : Promise<void> {
    await this.dataSource
    .createQueryBuilder()
    .update(VisitorReview)
    .set({
      isVisible: false
    })
    .where("id = :id", { id: id })
    .execute();
  }
}