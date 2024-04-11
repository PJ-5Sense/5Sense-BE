import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonRegistrationEntity, SessionLessonRegistrationEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class LessonRegistrationModule {}
