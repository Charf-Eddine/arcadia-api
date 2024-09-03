import { Inject, Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { DataSource } from 'typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) { }

  async create(createBreedDto: CreateBreedDto) {
    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Breed)
      .values(createBreedDto)
      .execute();
  }

  async findAll() {
    return await this.dataSource
      .getRepository(Breed)
      .createQueryBuilder('breed')
      .getMany();
  }

  async findOne(id: number) {
    return await this.dataSource
      .getRepository(Breed)
      .createQueryBuilder('breed')
      .where("breed.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(Breed)
      .set(updateBreedDto)
      .where("id = :id", { id: id })
      .execute();
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Breed)
      .where("id = :id", { id: id })
      .execute();
  }
}
