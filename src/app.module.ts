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
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AuthGuard } from './common/guards/auth-jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    CenterModule,
    LessonModule,
    StudentModule,
    TeacherModule,
    CategoryModule,
    CenterModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
