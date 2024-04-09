import { Module } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonScheduleEntity } from './entity/session-lesson-schedule.entity';
import { DurationLessonScheduleEntity } from './entity/duration-lesson-schedule.entity';
import { ScheduleRepository } from './repository/duration-schedule.repository';
import { SessionScheduleRepository } from './repository/session-schedule.repository';
import { LessonScheduleController } from './lesson-schedule.controller';
import { LessonRoomEntity } from 'src/lesson-room/entity/lesson-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonScheduleEntity, DurationLessonScheduleEntity, LessonRoomEntity])],
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService, ScheduleRepository, SessionScheduleRepository],
  exports: [LessonScheduleService],
})
export class LessonScheduleModule {}
