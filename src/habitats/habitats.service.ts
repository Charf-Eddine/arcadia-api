import { Inject, Injectable } from '@nestjs/common';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { DataSource } from 'typeorm';
import { Habitat } from './entities/habitat.entity';

@Injectable()
export class HabitatsService {

  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) { }

  async create(createHabitatDto: CreateHabitatDto) {
    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Habitat)
      .values(createHabitatDto)
      .execute();
  }

  async findAll(): Promise<Habitat[]> {
    return await this.dataSource
      .getRepository(Habitat)
      .createQueryBuilder('habitat')
      .getMany();
  }

  async findOne(id: number): Promise<Habitat> {
    return await this.dataSource
      .getRepository(Habitat)
      .createQueryBuilder('habitat')
      .where("habitat.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateHabitatDto: UpdateHabitatDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Habitat)
      .set(updateHabitatDto)
      .where("id = :id", { id: id })
      .execute();
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Habitat)
      .where("id = :id", { id: id })
      .execute();
  }
}
