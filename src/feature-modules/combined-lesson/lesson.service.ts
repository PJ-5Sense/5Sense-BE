import { Injectable } from '@nestjs/common';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/request/find-many-lesson.dto';
import { LessonType } from './type/lesson.type';
import { LessonRepository } from './lesson.repository';
import { ResponseFilteredLessonDTO } from './dto/response/filtered-lesson.dto';
import { PaginatedResponseFilteredLessonDTO } from 'src/feature-modules/combined-lesson/dto/response/pagenation-response.dto';
import { generateExampleDto } from '../../test';
import { ResponseCalendarLessonDTO } from './dto/response/calendar-lesson.dto';
// TODO : 트랜잭션 사용하는 방법 정의하기 - 단순 사용이 아닌 중복된 코드들을 개선하기 위한 작업이 필요함
@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

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
          lessonTime: schedule.lessonTime,
          memo: durationLesson.memo,
          startTime: schedule.startTime,
          teacher: durationLesson.teacher.name,
          numberOfStudents: durationLesson.durationRegistrations.length,
          room: schedule.lessonRoom.name,
        };
        const qwe = generateExampleDto(new ResponseCalendarLessonDTO(lessonData));
        console.log(qwe);
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

    console.log(typeof monthArray);
    return monthArray;
  }

  async getFilteredLessons(findManyLessonDTO: FindManyByFilterDTO, centerId: number) {
    const [lessons, total] = await this.lessonRepository.findManyLessonByFilter(findManyLessonDTO, centerId);

    return new PaginatedResponseFilteredLessonDTO(
      lessons.map(lesson => {
        return new ResponseFilteredLessonDTO(lesson);
      }),
      findManyLessonDTO.getPage(),
      findManyLessonDTO.getTake(),
      findManyLessonDTO.hasNextPage(total),
    );
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
