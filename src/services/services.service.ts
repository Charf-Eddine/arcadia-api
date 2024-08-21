import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DataSource } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) { }

  async create(createServiceDto: CreateServiceDto) {
    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values(createServiceDto)
      .execute();
  }

  async findAll() {
    return await this.dataSource
      .getRepository(Service)
      .createQueryBuilder('service')
      .getMany();
  }

  async findOne(id: number) {
    return await this.dataSource
      .getRepository(Service)
      .createQueryBuilder('service')
      .where("service.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Service)
      .set(updateServiceDto)
      .where("id = :id", { id: id })
      .execute();
    return this.findOne(id);

  }

  async remove(id: number) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Service)
      .where("id = :id", { id: id })
      .execute();
  }
}
