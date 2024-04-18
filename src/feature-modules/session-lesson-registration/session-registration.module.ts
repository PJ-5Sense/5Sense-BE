import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';
import { LessonRegistrationController } from './session-registration.controller';
import { LessonRegistrationService } from './session-registration.service';
import { LessonRegistrationRepository } from './session-registration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonRegistrationEntity])],
  controllers: [LessonRegistrationController],
  providers: [LessonRegistrationService, LessonRegistrationRepository],
  exports: [],
})
export class SessionLessonRegistrationModule {}
