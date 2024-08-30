import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { HabitatsModule } from './habitats/habitats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    DatabaseModule,
    ServicesModule,
    BreedsModule,
    UsersModule,
    HabitatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
