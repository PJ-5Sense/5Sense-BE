import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entitiy/duration-registration.entity';
import { SessionLessonRegistrationEntity } from './entitiy/session-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonRegistrationEntity, SessionLessonRegistrationEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class LessonRegistrationModule {}
