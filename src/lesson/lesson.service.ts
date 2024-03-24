import { Injectable } from '@nestjs/common';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/find-many-lesson.dto';
import { FindOneLessonDTO } from './dto/find-one-lesson.dto';
import { LessonType } from './types/lesson.type';
import { LessonRepository } from './lesson.repository';
import { LessonCategoryService } from 'src/lesson-category/category.service';
import { UpdateLessonDTO } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly lessonCategoryService: LessonCategoryService,
  ) {}
  async createLesson(createLessonDTO: CreateLessonDTO, centerId: number) {
    if (createLessonDTO.type === LessonType.DURATION) {
      // 카테고리가 대분류 기타라면 존재하는지 확인 하는 처리
      if (!createLessonDTO.durationLesson.category.id) {
        createLessonDTO.durationLesson.category.id = await this.lessonCategoryService.processEtceteraCategory(
          createLessonDTO.durationLesson.category.name,
        );
      }
      return await this.lessonRepository.createDurationLesson(createLessonDTO.durationLesson, centerId);
    }

    if (createLessonDTO.type === LessonType.SESSION) {
      if (!createLessonDTO.durationLesson.category.id) {
        createLessonDTO.durationLesson.category.id = await this.lessonCategoryService.processEtceteraCategory(
          createLessonDTO.durationLesson.category.name,
        );
      }
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
    const [lessons, total] = await this.lessonRepository.findManyLessonByFilter(findManyLessonDTO, centerId);

    return {
      lessons,
      meta: {
        page: findManyLessonDTO.getPage(),
        take: findManyLessonDTO.getTake(),
        hasNextPage: findManyLessonDTO.hasNextPage(total),
      },
    };
  }

  async getLessonDetails(id: number, centerId: number, findOneLessonDTO: FindOneLessonDTO) {
    // TODO : Typeorm의 날짜(Date)데이터 저장되고 사용되는 방식과 프론트 소통에서 사용되는 방식을 통일해야함
    if (findOneLessonDTO.type === LessonType.DURATION) {
      const lesson = await this.lessonRepository.findOneDurationDetails(id, centerId);
      const startDate =
        `${lesson.durationSchedules[0].startDate.getFullYear()}.` +
        `${lesson.durationSchedules[0].startDate.getMonth() + 1}.` +
        `${lesson.durationSchedules[0].startDate.getDate()}`;
      const endDate =
        `${lesson.durationSchedules[0].endDate.getFullYear()}.` +
        `${lesson.durationSchedules[0].endDate.getMonth() + 1}.` +
        `${lesson.durationSchedules[0].endDate.getDate()}`;

      return {
        id: lesson.id,
        name: lesson.name,
        memo: lesson.memo,
        type: LessonType.DURATION,
        teacher: lesson.teacher.name,
        mainCategory: lesson.category.parentId ? lesson.category.parentName : lesson.category.name,
        subCategory: lesson.category.parentId ? lesson.category.name : null,
        duration: startDate + ' ~ ' + endDate,
        lessonDurations: lesson.durationSchedules.map(schedule => {
          return {
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            repeatDate: schedule.repeatDate,
            room: schedule.lessonRoom.name,
          };
        }),
        numberOfStudents: lesson.durationRegistrations.length,
        registeredStudents: lesson.durationRegistrations.map(registration => {
          return {
            name: registration.student.name,
            phone: registration.student.phone,
          };
        }),
      };
    }

    if (findOneLessonDTO.type === LessonType.SESSION) {
      const lesson = await this.lessonRepository.findOneSessionDetails(id, centerId);
      return {
        id: lesson.id,
        name: lesson.name,
        memo: lesson.memo,
        type: LessonType.SESSION,
        teacher: lesson.teacher.name,
        mainCategory: lesson.category.parentId ? lesson.category.parentName : lesson.category.name,
        subCategory: lesson.category.parentId ? lesson.category.name : null,
        lessonTime: lesson.lessonTime,
        tuitionFee: lesson.tuitionFee,
        totalSessions: lesson.totalSessions,
        capacity: lesson.capacity,
        numberOfStudents: lesson.sessionRegistrations.length,
        registeredStudent: lesson.sessionRegistrations.map(registration => {
          return {
            name: registration.student.name,
            phone: registration.student.phone,
            sessionCount: `${registration.sessionSchedules.length}/${lesson.totalSessions}`,
          };
        }),
      };
    }
  }

  async updateLesson(updateLessonDTO: UpdateLessonDTO, centerId: number) {
    if (updateLessonDTO.type === LessonType.DURATION) {
      return await this.lessonRepository.updateDurationLesson(updateLessonDTO.durationLesson, centerId);
    }
    if (updateLessonDTO.type === LessonType.SESSION) {
      return await this.lessonRepository.updateSessionLesson(updateLessonDTO.sessionLesson, centerId);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////                                Private Section                             ////
  ////////////////////////////////////////////////////////////////////////////////////

  /**
   * 요일 별 첫 주 날짜 가져오기 함수
   *
   * @param {number} year 2024
   * @param {number} month 2
   * @returns {number[]} [4, 5, 6, 7, 1, 2, 3] = [일, 월, 화, 수, 목, 금, 토]
   */
  private getDatesOfFirstWeekByDay(year: number, month: number) {
    const result = new Array(7).fill(null); // 일주일 배열 생성
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 1일의 요일을 가져오기

    for (let i = 0; i < 7; i++) {
      result[(firstDayOfMonth + i) % 7] = i + 1; // 해당 요일에 날짜를 할당
    }

    return result;
  }

  private getStartDayDate(firstDayDateOfMonth: number, startDayDate: number) {
    while (firstDayDateOfMonth < startDayDate) {
      firstDayDateOfMonth += 7;
    }

    // 배열 0번째는 1일을 의미하여 첫 시작날에 -1을 계산해서 리턴하도록 함
    return firstDayDateOfMonth - 1;
  }
}
