import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';
import { LessonRegistrationController } from './lesson-registration.controller';
import { RegistrationViewEntity } from './entity/registration-view.entity';
import { LessonRegistrationService } from './lesson-registration.service';
import { LessonRegistrationRepository } from './lesson-registration.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DurationLessonRegistrationEntity,
      SessionLessonRegistrationEntity,
      RegistrationViewEntity,
    ]),
  ],
  controllers: [LessonRegistrationController],
  providers: [LessonRegistrationService, LessonRegistrationRepository],
  exports: [],
})
export class LessonRegistrationModule {}
