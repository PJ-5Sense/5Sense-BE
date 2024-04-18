import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './common/environment/environment.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './feature-modules/user/user.module';
import { CenterModule } from './feature-modules/center/center.module';
import { TeacherModule } from './feature-modules/teacher/teacher.module';
import { StudentModule } from './feature-modules/student/student.module';
import { LessonModule } from './feature-modules/combined-lesson/lesson.module';
import { AuthModule } from './feature-modules/auth/auth.module';
import { AuthGuard } from './common/guard/auth-jwt.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { LoggerMiddleware } from './common/middleware/http-log.middleware';
import { LessonRoomModule } from './feature-modules/lesson-room/lesson-room.module';
import { DurationLessonModule } from './feature-modules/duration-lesson/duration-lesson.module';
import { SessionLessonModule } from './feature-modules/session-lesson/session-lesson.module';
import { BillingPaymentModule } from './feature-modules/billing-payment/billing-payment.module';
import { LessonScheduleModule } from './feature-modules/lesson-schedule/lesson-schedule.module';
import { DurationLessonRegistrationModule } from './feature-modules/duration-lesson-registration/duration-registration.module';
import { SessionLessonRegistrationModule } from './feature-modules/session-lesson-registration/session-registration.module';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    CenterModule,
    LessonModule,
    DurationLessonModule,
    SessionLessonModule,
    LessonScheduleModule,
    DurationLessonRegistrationModule,
    SessionLessonRegistrationModule,
    BillingPaymentModule,
    StudentModule,
    TeacherModule,
    CenterModule,
    LessonRoomModule,
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
