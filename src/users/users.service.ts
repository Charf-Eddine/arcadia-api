import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { PasswordService } from 'src/users/password.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
    private readonly passwordService: PasswordService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    let existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      let err: Error = {
        name: "Erreur de création",
        message: "Cette adresse email est déjà associée à un compte existant",
      };
      throw new ForbiddenException(err);
    }
    else {
      const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(createUserDto)
        .execute();
      return result.identifiers[0].id;  
    }
  }

  async findAll() {
    return await this.dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'user.firstname', 'user.lastname', 'user.email', 'user.role'])
    .getMany();
  }

  async findOne(id: number): Promise<User> {
    let user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where("user.id = :id", { id: id })
      .getOne();
    
    if (user) {
      delete user.password;
    }

    return user
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
    }

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