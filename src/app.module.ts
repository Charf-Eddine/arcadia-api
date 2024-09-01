import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { HabitatsModule } from './habitats/habitats.module';
import { ConfigModule } from '@nestjs/config';
import { AnimalsModule } from 'src/animals/animals.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    DatabaseModule,
    ServicesModule,
    BreedsModule,
    UsersModule,
    HabitatsModule,
    AnimalsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
