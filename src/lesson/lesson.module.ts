import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonEntity } from './entities/duration-lesson.entity';
import { SessionLessonEntity } from './entities/session-lesson.entity';
import { LessonRegistrationModule } from 'src/lesson-registration/lesson-registration.module';
import { LessonScheduleModule } from 'src/lesson-schedule/lesson-schedule.module';
import { CategoryModule } from 'src/lesson-category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DurationLessonEntity, SessionLessonEntity]),
    LessonRegistrationModule,
    LessonScheduleModule,
    CategoryModule,
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}

// 클래스 등록은 하나의 등록 api에서 분기처리되어서 받음 POST로
// 그러면 거기에 저장되는애들은 관계설정이 무엇이 있는지 알아야함
// 기간반 - 기간반은 일정을 바로 등록함, 기간반 클래스 + 기간반 시간 등록
