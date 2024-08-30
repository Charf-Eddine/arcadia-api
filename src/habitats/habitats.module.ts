import { Module } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { HabitatsController } from './habitats.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HabitatsController],
  providers: [HabitatsService],
})
export class HabitatsModule { }
