import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { CategoryModule } from './lesson/lesson-category/category.module';
import { AuthGuard } from './common/guards/auth-jwt.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { LoggerMiddleware } from './common/middleware/http-log.middleware';
import { RoomModule } from './room/room.module';

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
    RoomModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
