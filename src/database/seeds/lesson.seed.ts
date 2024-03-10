// import { faker } from '@faker-js/faker';
// import { CenterEntity } from 'src/center/entities/center.entity';
// import { DurationLessonEntity } from 'src/lesson/entities/duration-lesson.entity';
// import { LessonEntity, LessonType } from 'src/lesson/entities/lesson.entity';
// import { CategoryEntity } from 'src/lesson/lesson-category/entities/category.entity';
// import { LessonRegistrationEntity } from 'src/lesson/lesson-registration/entities/lesson-registration.entity';
// import { PaymentStatus } from 'src/lesson/types/lesson-payment-status.type';
// import { StudentEntity } from 'src/student/entities/student.entity';
// import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
// import { UserEntity } from 'src/user/entities/user.entity';
// import { DataSource } from 'typeorm';
// import { Seeder, SeederFactoryManager } from 'typeorm-extension';

// export default class LessonSeed1702051029391 implements Seeder {
//   track = false;

//   public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
//     const userFactory = dataSource.getRepository(UserEntity);
//     const userId = (await userFactory.findOneBy({ name: '윤태식' })).id;
//     const centerId = (await dataSource.getRepository(CenterEntity).findOneBy({ userId })).id;
//     const teacherIds = (await dataSource.getRepository(TeacherEntity).find({ where: { centerId } })).map(t => t.id);
//     const studentIds = (await dataSource.getRepository(StudentEntity).find({ where: { centerId } })).map(s => s.id);
//     const categories = (await dataSource.getRepository(CategoryEntity).find()).map(c => c.id);
//     const lessonFactory = dataSource.getRepository(LessonEntity);
//     const lessonType = [LessonType.DURATION, LessonType.SESSION];
//     const repeatDate = ['월', '화', '수', '목', '금'];
//     let startTimeHour = 9;

//     for (let i = 0; i < 14; i++) {
//       startTimeHour++;
//       const repeatDays = Array(faker.number.int({ min: 1, max: 5 }))
//         .fill(0)
//         .map(() => repeatDate[faker.number.int({ min: 0, max: 4 })]);
//       const past = faker.date.past({ years: 1 });
//       const startDate = faker.date.between({ from: past, to: new Date(2024, 5, 1) });
//       const endDate = faker.date.between({ from: startDate, to: new Date(2024, 5, 1) });
//       const startTime = `${startTimeHour}:00:00`;
//       const endTime = `${startTimeHour + 1}:00:00`;
//       const lesson = new LessonEntity();
//       lesson.name = faker.word.words({ count: { min: 5, max: 10 } });
//       lesson.memo = faker.word.words({ count: { min: 5, max: 10 } });
//       lesson.type = lessonType[faker.number.int({ min: 4, max: 28 }) % 2];
//       lesson.tuitionFee = Number(faker.finance.accountNumber({ length: 8 }));
//       lesson.capacity = 5;
//       lesson.centerId = centerId;
//       lesson.teacherId = teacherIds[faker.number.int({ min: 4, max: 28 }) % teacherIds.length];
//       lesson.categoryId = categories[faker.number.int({ min: 4, max: 28 }) % categories.length];
//       lesson.lessonTime = 60;

//       // 레슨 정보 저장
//       const savedLesson = await lessonFactory.save(lesson);

//       // 기간반과 회차반 저장
//       if (lesson.type === 'duration') {
//         await dataSource.getRepository(DurationLessonEntity).save({
//           lesson: savedLesson,
//           startDate: startDate,
//           endDate: endDate,
//           startTime: startTime,
//           endTime: endTime,
//           repeatDate: [...new Set(repeatDays)].join(','),
//         });
//       } else {
//         await dataSource.getRepository(LessonRegistrationEntity).save({
//           lesson: savedLesson,
//           startDate: startDate,
//           endDate: endDate,
//           startTime: startTime,
//           endTime: endTime,
//           studentId: studentIds[faker.number.int({ min: 4, max: 28 }) % studentIds.length],
//           paymentStatus: PaymentStatus.UNPAID,
//         });
//       }
//     }
//   }
// }
