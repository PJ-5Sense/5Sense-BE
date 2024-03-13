import { Module } from '@nestjs/common';
import { LessonRegistrationService } from './lesson-registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entities/duration-registration.entity';
import { SessionLessonRegistrationEntity } from './entities/session-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [LessonRegistrationService],
  exports: [LessonRegistrationService],
})
export class LessonRegistrationModule {}
