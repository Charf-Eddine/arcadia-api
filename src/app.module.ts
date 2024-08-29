import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, ServicesModule, BreedsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
