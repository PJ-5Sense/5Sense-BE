import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { LessonRegistrationController } from './duration-registration.controller';
import { DurationLessonRegistrationService } from './duration-registration.service';
import { DurationLessonRegistrationRepository } from './duration-registration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonRegistrationEntity])],
  controllers: [LessonRegistrationController],
  providers: [DurationLessonRegistrationService, DurationLessonRegistrationRepository],
  exports: [],
})
export class LessonRegistrationModule {}
