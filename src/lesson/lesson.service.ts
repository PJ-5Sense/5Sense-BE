import { Injectable } from '@nestjs/common';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/find-many-lesson.dto';
import { FindOneLessonDTO } from './dto/find-one-lesson.dto';
import { LessonType } from './types/lesson.type';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}
  async createLesson(createLessonDTO: CreateLessonDTO, centerId: number) {
    if (createLessonDTO.type === LessonType.DURATION) {
      return await this.lessonRepository.createDurationLesson(createLessonDTO.durationLesson, centerId);
    }

    if (createLessonDTO.type === LessonType.SESSION) {
      return await this.lessonRepository.createSessionLesson(createLessonDTO.sessionLesson, centerId);
    }
  }

  async getLessonsByDate(findManyByDateDTO: FindManyByDateDTO, centerId: number) {
    const startDate = new Date(findManyByDateDTO.year, findManyByDateDTO.month - 1, 1);
    const endDate = new Date(findManyByDateDTO.year, findManyByDateDTO.month, 0);
    const startDayOfMonth = Number(startDate.toString().slice(8, 10));
    const lastDayOfMonth = Number(endDate.toString().slice(8, 10));
    const monthArray = Array(lastDayOfMonth)
      .fill(null)
      .map(() => []);
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    const firstWeekDayDates = this.getDatesOfFirstWeekByDay(findManyByDateDTO.year, findManyByDateDTO.month);
    const [durationLessons, sessionLessons] = await this.lessonRepository.findManyLessonByDate(
      startDate,
      endDate,
      centerId,
    );

    for (const durationLesson of durationLessons) {
      for (const schedule of durationLesson.durationSchedules) {
        const startDay =
          startDate < schedule.startDate ? Number(schedule.startDate.toString().slice(8, 10)) : startDayOfMonth;

        const lessonData = {
          id: durationLesson.id,
          type: LessonType.DURATION,
          name: durationLesson.name,
          lessonTime: durationLesson.lessonTime,
          memo: durationLesson.memo,
          startTime: schedule.startTime,
          teacher: durationLesson.teacher.name,
          numberOfStudents: durationLesson.durationRegistrations.length,
          room: schedule.lessonRoom.name,
        };

        for (const day of schedule.repeatDate.split(',')) {
          const index = weeks.indexOf(day);
          let startDayDate = this.getStartDayDate(firstWeekDayDates[index], startDay);

          while (startDayDate < lastDayOfMonth) {
            monthArray[startDayDate].push(lessonData);

            startDayDate += 7;
          }
        }
      }
    }

    for (const sessionLesson of sessionLessons) {
      for (const sessionRegistration of sessionLesson.sessionRegistrations) {
        for (const schedule of sessionRegistration.sessionSchedules) {
          const lessonData = {
            id: sessionLesson.id,
            type: LessonType.SESSION,
            name: sessionLesson.name,
            lessonTime: sessionLesson.lessonTime,
            memo: sessionLesson.memo,
            startTime: schedule.startTime,
            teacher: sessionLesson.teacher.name,
            numberOfStudents: sessionLesson.sessionRegistrations.length,
            room: schedule.lessonRoom.name,
          };

          monthArray[Number(schedule.sessionDate.toString().slice(8, 10)) - 1].push(lessonData);
        }
      }
    }

    return monthArray;
  }

  async getFilteredLessons(findManyLessonDTO: FindManyByFilterDTO, centerId: number) {
    // const lessonQuery = this.lessonRepository
    //   .createQueryBuilder('lesson')
    //   .select(['lesson.id', 'lesson.name', 'lesson.type'])
    //   .leftJoin('lesson.teacher', 'teacher')
    //   .addSelect(['teacher.name'])
    //   .leftJoin('lesson.category', 'category')
    //   .addSelect(['category.name'])
    //   .where('lesson.centerId = :centerId', { centerId });
    // if (findManyLessonDTO.teachers.length > 0 && findManyLessonDTO.categories.length > 0) {
    //   lessonQuery.andWhere('(teacher.name IN (:teacher) OR lesson.categoryId IN (:category))', {
    //     teacher: findManyLessonDTO.teachers,
    //     category: findManyLessonDTO.categories,
    //   });
    // } else if (findManyLessonDTO.teachers.length > 0) {
    //   lessonQuery.andWhere('teacher.name IN (:teacher)', { teacher: findManyLessonDTO.teachers });
    // } else if (findManyLessonDTO.categories.length > 0) {
    //   lessonQuery.andWhere('lesson.categoryId IN (:category)', { category: findManyLessonDTO.categories });
    // }
    // const [lessons, total] = await lessonQuery
    //   .orderBy(`lesson.createdDate`, 'DESC')
    //   .offset(findManyLessonDTO.getSkip())
    //   .limit(findManyLessonDTO.getTake())
    //   .getManyAndCount();
    // return {
    //   lessons: lessons.map(lesson => {
    //     return {
    //       id: lesson.id,
    //       name: lesson.name,
    //       type: lesson.type,
    //       teacher: lesson.teacher.name,
    //       category: lesson.category.name,
    //     };
    //   }),
    //   meta: {
    //     page: findManyLessonDTO.getPage(),
    //     take: findManyLessonDTO.getTake(),
    //     hasNextPage: findManyLessonDTO.hasNextPage(total),
    //   },
    // };
  }

  /**
   * 요일 별 첫 주 날짜 가져오기 함수
   *
   * @param {number} year 2024
   * @param {number} month 2
   * @returns {number[]} [4, 5, 6, 7, 1, 2, 3] = [일, 월, 화, 수, 목, 금, 토]
   */
  getDatesOfFirstWeekByDay(year: number, month: number) {
    const result = new Array(7).fill(null); // 일주일 배열 생성
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 1일의 요일을 가져오기

    for (let i = 0; i < 7; i++) {
      result[(firstDayOfMonth + i) % 7] = i + 1; // 해당 요일에 날짜를 할당
    }

    return result;
  }

  getStartDayDate(firstDayDateOfMonth: number, startDayDate: number) {
    while (firstDayDateOfMonth < startDayDate) {
      firstDayDateOfMonth += 7;
    }

    // 배열 0번째는 1일을 의미하여 첫 시작날에 -1을 계산해서 리턴하도록 함
    return firstDayDateOfMonth - 1;
  }

  async getLesson(id: number, centerId: number, findOneLessonDTO: FindOneLessonDTO) {
    // 강사, 클래스 타입, 메모, 수강생 정보, 회원 정보
    // show = Student | Schedule
    //   const lessonQuery = this.lessonRepository
    //     .createQueryBuilder('lesson')
    //     .leftJoinAndSelect('lesson.teacher', 'teacher')
    //     .leftJoinAndSelect('lesson.category', 'category')
    //     .leftJoinAndSelect('lesson.durationLessons', 'durationLessons');
    //   if (findOneLessonDTO.includeStudents) {
    //     lessonQuery
    //       .leftJoin('lesson.lessonRegistrations', 'lessonRegistrations')
    //       .addSelect(['lessonRegistrations.id', 'lessonRegistrations.paymentStatus', 'lessonRegistrations.startDate'])
    //       .leftJoin('lessonRegistrations.student', 'student')
    //       .addSelect(['student.id', 'student.name', 'student.phone']);
    //   }
    //   const lesson = await lessonQuery
    //     .where('lesson.id = :id', { id })
    //     .andWhere('lesson.centerId = :centerId', { centerId })
    //     .getOne();
    //   if (lesson.type === 'session') {
    //     return {
    //       id: lesson.id,
    //       name: lesson.name,
    //       memo: lesson.memo,
    //       type: lesson.type,
    //       tuitionFee: lesson.tuitionFee,
    //       category: { id: lesson.category.id, name: lesson.category.name, parentId: lesson.category.parentId },
    //       teacher: { id: lesson.teacher.id, name: lesson.teacher.name },
    //       schedule: lesson.durationLessons.map(durationLesson => {
    //         const date = `${durationLesson.startDate.getFullYear()}.${
    //           durationLesson.startDate.getMonth() + 1
    //         }.${durationLesson.startDate.getDate()} ~ ${durationLesson.endDate.getFullYear()}.${
    //           durationLesson.endDate.getMonth() + 1
    //         }.${durationLesson.endDate.getDate()}`;
    //         return {
    //           duration: date,
    //           time: durationLesson.startTime.slice(0, 5) + ' - ' + durationLesson.endTime.slice(0, 5),
    //           days: durationLesson.repeatDate + ' 반복',
    //           room: 'copy copy room room',
    //         };
    //       }),
    //     };
    //   } else {
    //     return {
    //       id: lesson.id,
    //       name: lesson.name,
    //       memo: lesson.memo,
    //       type: lesson.type,
    //       tuitionFee: lesson.tuitionFee,
    //       category: { id: lesson.category.id, name: lesson.category.name, parentId: lesson.category.parentId },
    //       teacher: { id: lesson.teacher.id, name: lesson.teacher.name },
    //     };
    //   }
  }

  async lessonview() {
    return await this.lessonRepository.test();
  }
}
// include student = false
// 기간반 이름, 메모, 카테고리, 클래스 유형, 수강료, 일정 정보(duration lesson 정보), 강사
// 회차반 이름, 메모, 카테고리, 클래스 유형, 수강료, 강사
// include student = true
// 기간반 이름, 메모, 카테고리, 클래스 유형, 수강료, 일정 정보(duration lesson 정보), 강사, 등록된 학생들 정보
// 회차반 이름, 메모, 카테고리, 클래스 유형, 수강료, 강사, 등록된 학생들 정보
