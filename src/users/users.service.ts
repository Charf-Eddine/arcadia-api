import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
  }

  async findAll() {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
  }

  async findOne(id: number) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where("user.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where("id = :id", { id: id })
      .execute();
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: id })
      .execute();
  }
}
