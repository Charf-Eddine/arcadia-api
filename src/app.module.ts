import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AnimalsModule } from './animals/animals.module';
import { HabitatsModule } from './habitats/habitats.module';
import { FilesModule } from './files/files.module';
import { VisitorReviewsModule } from './visitor-reviews/visitor-reviews.module';
import { VeterinaryReportsModule } from './veterinary-reports/veterinary-reports.module';
import { DailyFeedsModule } from './daily-feeds/daily-feeds.module';
import { VeterinaryReviewsModule } from './veterinary-reviews/veterinary-reviews.module';
import { SchedulesModule } from './schedules/schedules.module';
import { MailingModule } from './mailing/mailing.module';
import { AuthModule } from './auth/auth.module';
import { StatisticsModule } from './statistics/statistics.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ServicesModule,
    BreedsModule,
    UsersModule,
    AnimalsModule,
    HabitatsModule,
    FilesModule,
    VisitorReviewsModule,
    VeterinaryReportsModule,
    DailyFeedsModule,
    VeterinaryReviewsModule,
    SchedulesModule,
    MailingModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/arcadia'),
    StatisticsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}