import { Module } from '@nestjs/common';
import { LessonRegistrationService } from './lesson-student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRegistration } from './entities/lesson-student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRegistration])],
  providers: [LessonRegistrationService],
  exports: [LessonRegistrationService],
})
export class LessonRegistrationModule {}
