import { Module } from '@nestjs/common';
import { SessionLessonScheduleService } from './lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonScheduleEntity } from './entity/session-lesson-schedule.entity';
import { SessionScheduleRepository } from './session-schedule.repository';
import { SessionLessonScheduleController } from './lesson-schedule.controller';
import { LessonRoomEntity } from 'src/feature-modules/lesson-room/entity/lesson-room.entity';
import { SessionLessonRegistrationModule } from '../session-lesson-registration/session-registration.module';
import { DateHelper } from 'src/common/helper/date.helper';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonScheduleEntity, LessonRoomEntity]), SessionLessonRegistrationModule],
  controllers: [SessionLessonScheduleController],
  providers: [SessionLessonScheduleService, SessionScheduleRepository, DateHelper],
  exports: [SessionLessonScheduleService],
})
export class SessionLessonScheduleModule {}
