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
    const result = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
    return result.identifiers[0].id;
  }

  async findAll() {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where("user.id = :id", { id: id })
      .getOne();
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
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