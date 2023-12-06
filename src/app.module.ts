import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CenterModule } from './center/center.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [EnvironmentModule, DatabaseModule, UserModule, LessonModule, CenterModule, StudentModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
