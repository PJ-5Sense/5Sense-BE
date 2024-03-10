import { Module } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { LessonScheduleController } from './lesson-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonScheduleEntity } from './entities/duration-lesson-schedule.entity';
import { SessionLessonScheduleEntity } from './entities/session-lesson-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonScheduleEntity, SessionLessonScheduleEntity])],
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService],
})
export class LessonScheduleModule {}
