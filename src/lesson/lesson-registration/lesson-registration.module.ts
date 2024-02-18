import { Module } from '@nestjs/common';
import { LessonRegistrationService } from './lesson-registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRegistrationEntity } from './entities/lesson-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRegistrationEntity])],
  providers: [LessonRegistrationService],
  exports: [LessonRegistrationService],
})
export class LessonRegistrationModule {}
