import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { DataSource, InsertResult } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) {}
    
  async create(createServiceDto: CreateServiceDto): Promise<InsertResult> {
    return await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(Service)
    .values(createServiceDto)
    .execute();
  }

  async findAll(): Promise<Service[]> {
    return await this.dataSource
      .getRepository(Service)
      .createQueryBuilder('service')
      .orderBy('service.dateCreation', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<Service> {
    return await this.dataSource
      .getRepository(Service)
      .createQueryBuilder('service')
      .where("service.id = :id", { id: id })
      .getOne();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    await this.dataSource
    .createQueryBuilder()
    .update(Service)
    .set(updateServiceDto)
    .where("id = :id", { id: id })
    .execute();
    return  this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Service)
      .where("id = :id", { id: id })
      .execute();
  }
}