import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, FilesService],
  exports: [AnimalsService],
})
export class AnimalsModule { }