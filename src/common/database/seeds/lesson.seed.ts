import { faker } from '@faker-js/faker';
import { CenterEntity } from 'src/feature-modules/center/entity/center.entity';
import { CategoryEntity } from 'src/feature-modules/lesson-category/entity/category.entity';
import { DurationLessonEntity } from 'src/feature-modules/duration-lesson/duration-lesson.entity';
import { SessionLessonEntity } from 'src/feature-modules/session-lesson/session-lesson.entity';
import { PaymentStatus } from 'src/feature-modules/combined-lesson/type/lesson-payment-status.type';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { TeacherEntity } from 'src/feature-modules/teacher/entity/teacher.entity';
import { UserEntity } from 'src/feature-modules/user/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DurationLessonScheduleEntity } from 'src/feature-modules/lesson-schedule/entity/duration-lesson-schedule.entity';
import { SessionLessonScheduleEntity } from 'src/feature-modules/lesson-schedule/entity/session-lesson-schedule.entity';
import { DurationLessonRegistrationEntity } from '../../../feature-modules/duration-lesson-registration/entity/duration-registration.entity';
import { SessionLessonRegistrationEntity } from '../../../feature-modules/session-lesson-registration/entity/session-registration.entity';

export default class LessonSeed1702051029391 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userFactory = dataSource.getRepository(UserEntity);
    const userId = (await userFactory.findOneBy({ name: '윤태식' })).id;
    const centerId = (await dataSource.getRepository(CenterEntity).findOneBy({ userId })).id;
    const teacherIds = (await dataSource.getRepository(TeacherEntity).find({ where: { centerId } })).map(t => t.id);
    const studentIds = (await dataSource.getRepository(StudentEntity).find({ where: { centerId } })).map(s => s.id);
    const categories = (await dataSource.getRepository(CategoryEntity).find()).filter(c => c.parentId).map(c => c.id);
    const durationLessonFactory = dataSource.getRepository(DurationLessonEntity);
    const durationRegistrationFactory = dataSource.getRepository(DurationLessonRegistrationEntity);
    const durationScheduleFactory = dataSource.getRepository(DurationLessonScheduleEntity);
    const sessionLessonFactory = dataSource.getRepository(SessionLessonEntity);
    const sessionRegistrationFactory = dataSource.getRepository(SessionLessonRegistrationEntity);
    const sessionScheduleFactory = dataSource.getRepository(SessionLessonScheduleEntity);
    const repeatDate = ['월', '화', '수', '목', '금'];
    let startTimeHour = 9;

    for (let i = 0; i < 14; i++) {
      startTimeHour++;
      const repeatDays = Array(faker.number.int({ min: 1, max: 5 }))
        .fill(0)
        .map(() => repeatDate[faker.number.int({ min: 0, max: 4 })]);
      const past = faker.date.past({ years: 1 });
      const startDate = faker.date.between({ from: past, to: new Date(2024, 5, 1) });
      const endDate = faker.date.between({ from: startDate, to: new Date(2024, 5, 1) });
      const startTime = `${startTimeHour}:00:00`;
      const endTime = `${startTimeHour + 1}:00:00`;
      const lesson = new DurationLessonEntity();
      lesson.name = faker.word.words({ count: { min: 5, max: 10 } });
      lesson.memo = faker.word.words({ count: { min: 5, max: 10 } });

      lesson.tuitionFee = Number(faker.finance.accountNumber({ length: 8 }));
      lesson.centerId = centerId;
      lesson.teacherId = teacherIds[faker.number.int({ min: 4, max: 28 }) % teacherIds.length];
      lesson.categoryId = categories[faker.number.int({ min: 4, max: 28 }) % categories.length];

      // 레슨 정보 저장
      const savedLesson = await durationLessonFactory.save(lesson);
      // 레슨의 등록생 저장하기 열명정도?
      for (let i = 0; i < 5; i++) {
        await durationRegistrationFactory.save({
          durationLesson: savedLesson,
          studentId: studentIds[faker.number.int({ min: 4, max: 28 }) % studentIds.length],
          paymentStatus: PaymentStatus.UNPAID,
        });
      }

      // 일정 저장하기 하나의 스케쥴에 한개씩 넣어보자
      await durationScheduleFactory.save({
        durationLesson: savedLesson,
        repeatDate: [...new Set(repeatDays)].join(','),
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        lessonTime: 60,
        studentId: studentIds[faker.number.int({ min: 4, max: 28 }) % studentIds.length],
        roomId: 1,
      });
    }

    // 세션 레슨 정보
    for (let i = 0; i < 10; i++) {
      const lesson = new SessionLessonEntity();
      lesson.name = faker.word.words({ count: { min: 5, max: 10 } });
      lesson.memo = faker.word.words({ count: { min: 5, max: 10 } });
      lesson.lessonTime = 60;
      lesson.tuitionFee = Number(faker.finance.accountNumber({ length: 8 }));
      lesson.capacity = 10;
      lesson.totalSessions = 10;
      lesson.centerId = centerId;
      lesson.teacherId = teacherIds[faker.number.int({ min: 4, max: 28 }) % teacherIds.length];
      lesson.categoryId = categories[faker.number.int({ min: 4, max: 28 }) % categories.length];
      const savedLesson = await sessionLessonFactory.save(lesson);

      // 등록생 5명
      for (let i = 0; i < 5; i++) {
        const savedRegistration = await sessionRegistrationFactory.save({
          sessionLesson: savedLesson,
          studentId: studentIds[faker.number.int({ min: 4, max: 28 }) % studentIds.length],
          paymentStatus: PaymentStatus.UNPAID,
        });

        // 일정 등록 3개
        for (let i = 0; i < 3; i++) {
          // 랜덤 날짜 생성
          const past = faker.date.past({ years: 1 });
          const startDate = faker.date.between({ from: past, to: new Date(2024, 5, 1) });
          const startTime = `${faker.number.int({ min: 9, max: 19 })}:00:00`;
          const endTime = `${faker.number.int({ min: 10, max: 20 })}:00:00`;

          await sessionScheduleFactory.save({
            sessionRegistration: savedRegistration,
            sessionDate: startDate,
            startTime: startTime,
            endTime: endTime,
            studentId: studentIds[faker.number.int({ min: 4, max: 28 }) % studentIds.length],
            roomId: 1,
          });
        }
      }
    }
  }
}
