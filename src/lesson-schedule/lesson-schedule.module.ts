import { Module } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonScheduleEntity } from './entity/session-lesson-schedule.entity';
import { DurationLessonScheduleEntity } from './entity/duration-lesson-schedule.entity';
import { DurationScheduleRepository } from './repository/duration-schedule.repository';
import { SessionScheduleRepository } from './repository/session-schedule.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonScheduleEntity, DurationLessonScheduleEntity])],
  controllers: [],
  providers: [LessonScheduleService, DurationScheduleRepository, SessionScheduleRepository],
  exports: [LessonScheduleService],
})
export class LessonScheduleModule {}
