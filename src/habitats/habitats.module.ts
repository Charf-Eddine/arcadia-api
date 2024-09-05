import { Module } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { HabitatsController } from './habitats.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [HabitatsController],
  providers: [HabitatsService, FilesService],
  exports: [HabitatsService],
})
export class HabitatsModule { }
