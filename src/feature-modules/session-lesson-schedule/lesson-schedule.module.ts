import { Module } from '@nestjs/common';
import { SessionLessonScheduleService } from './lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonScheduleEntity } from './entity/session-lesson-schedule.entity';
import { SessionScheduleRepository } from './session-schedule.repository';
import { SessionLessonScheduleController } from './lesson-schedule.controller';
import { LessonRoomEntity } from 'src/feature-modules/lesson-room/entity/lesson-room.entity';
import { SessionLessonRegistrationModule } from '../session-lesson-registration/session-registration.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonScheduleEntity, LessonRoomEntity]), SessionLessonRegistrationModule],
  controllers: [SessionLessonScheduleController],
  providers: [SessionLessonScheduleService, SessionScheduleRepository],
  exports: [SessionLessonScheduleService],
})
export class SessionLessonScheduleModule {}
