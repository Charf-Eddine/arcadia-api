import { Inject, Injectable } from '@nestjs/common';
import { CreateVeterinaryReportDto } from './dto/create-veterinary-report.dto';
import { UpdateVeterinaryReportDto } from './dto/update-veterinary-report.dto';
import { DataSource, InsertResult } from 'typeorm';
import { VeterinaryReport } from './entities/veterinary-report.entity';

@Injectable()
export class VeterinaryReportsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) {}
  
  async create(createVeterinaryReportDto: CreateVeterinaryReportDto): Promise<InsertResult> {
    return await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(VeterinaryReport)
    .values(createVeterinaryReportDto)
    .execute();
  }

  async find(filters : any = null): Promise<VeterinaryReport[]> {
    let qb = this.dataSource
      .getRepository(VeterinaryReport)
      .createQueryBuilder('veterinaryReport')
      .leftJoin("veterinaryReport.user", "user")
      .addSelect(["user.id", "user.firstname", "user.lastname"])
      .leftJoin("veterinaryReport.animal", "animal")
      .addSelect(["animal.id", "animal.name"])

      if (filters && filters.animalId) {
        qb.where("veterinaryReport.animalId = :animalId", { animalId: filters.animalId })
      }

      if (filters && filters.userId) {
        qb.where("veterinaryReport.userId = :userId", { userId: filters.userId })
      }

      return await qb.orderBy("veterinaryReport.passageDate", "DESC").getMany();
  }

  async findOne(id: number): Promise<VeterinaryReport> {
    return await this.dataSource
      .getRepository(VeterinaryReport)
      .createQueryBuilder('veterinaryReport')
      .leftJoin("veterinaryReport.user", "user")
      .addSelect(["user.id", "user.firstname", "user.lastname"])
      .leftJoin("veterinaryReport.animal", "animal")
      .addSelect(["animal.id", "animal.name"])
      .where("veterinaryReport.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateVeterinaryReportDto: UpdateVeterinaryReportDto): Promise<VeterinaryReport> {
    await this.dataSource
    .createQueryBuilder()
    .update(VeterinaryReport)
    .set(updateVeterinaryReportDto)
    .where("id = :id", { id: id })
    .execute();
    return  this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(VeterinaryReport)
      .where("id = :id", { id: id })
      .execute();
  }
}