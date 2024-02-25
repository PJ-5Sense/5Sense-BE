import { Injectable } from '@nestjs/common';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { LessonEntity, LessonType } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DurationLessonEntity } from './entities/duration-lesson.entity';
import { LessonRegistrationEntity } from './lesson-registration/entities/lesson-registration.entity';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/find-many-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity) private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(DurationLessonEntity) private readonly durationLessonRepository: Repository<DurationLessonEntity>,
    @InjectRepository(LessonRegistrationEntity)
    private readonly lessonRegistrationRepository: Repository<LessonRegistrationEntity>,
  ) {}
  async create(createLessonDTO: CreateLessonDTO, centerId: number) {
    const { durationLesson, category, ...commonLessonData } = createLessonDTO;
    if (createLessonDTO.type === LessonType.DURATION) {
      // 레슨 정보 저장, 레슨 카테고리 저장, 선생님 정보

      const newLessonData = this.lessonRepository.create({ ...commonLessonData, categoryId: category.id, centerId });

      const lesson = await this.lessonRepository.save({ ...newLessonData });

      return await this.durationLessonRepository.save(
        this.durationLessonRepository.create({ ...durationLesson, lesson }),
      );
    }

    if (createLessonDTO.type === LessonType.SESSION) {
      const newLessonData = this.lessonRepository.create({ ...commonLessonData, categoryId: category.id, centerId });
      return await this.lessonRepository.save(newLessonData);
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

    const durationLessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .select(['lesson.id', 'lesson.name', 'lesson.type', 'lesson.lessonTime', 'lesson.tuitionFee'])
      .leftJoin('lesson.durationLessons', 'durationLesson')
      .addSelect([
        'durationLesson.startDate',
        'durationLesson.endDate',
        'durationLesson.startTime',
        'durationLesson.endTime',
        'durationLesson.repeatDate',
      ])
      .leftJoin('lesson.teacher', 'teacher')
      .addSelect(['teacher.name'])
      .where('lesson.type = :type', { type: LessonType.DURATION })
      .andWhere('lesson.centerId = :centerId', { centerId })
      .andWhere('durationLesson.startDate <= :endDate AND durationLesson.endDate >= :startDate', { startDate, endDate })
      .getMany();

    const sessionLessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .select(['lesson.id', 'lesson.name', 'lesson.type', 'lesson.lessonTime', 'lesson.tuitionFee'])
      .leftJoin('lesson.lessonRegistrations', 'lessonRegistration')
      .addSelect([
        'lessonRegistration.startDate',
        'lessonRegistration.endDate',
        'lessonRegistration.startTime',
        'lessonRegistration.endTime',
      ])
      .leftJoin('lesson.teacher', 'teacher')
      .addSelect(['teacher.name'])
      .where('lesson.type = :type', { type: LessonType.SESSION })
      .andWhere('lesson.centerId = :centerId', { centerId })
      .andWhere('lessonRegistration.startDate <= :endDate AND lessonRegistration.endDate >= :startDate', {
        startDate,
        endDate,
      })
      .andWhere('lessonRegistration.id IS NOT NULL')
      .getMany();

    const lessons = [...durationLessons, ...sessionLessons];
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].durationLessons) {
        for (const durationLesson of lessons[i].durationLessons) {
          const startDay =
            startDate < durationLesson.startDate
              ? Number(durationLesson.startDate.toString().slice(8, 10))
              : startDayOfMonth;

          for (const day of durationLesson.repeatDate.split(',')) {
            const index = weeks.indexOf(day);
            let startDayDate = this.getStartDayDate(firstWeekDayDates[index], startDay);

            while (startDayDate < lastDayOfMonth) {
              const lessonData = {
                id: lessons[i].id,
                type: lessons[i].type,
                name: lessons[i].name,
                startTime: durationLesson.startTime,
                lessonTime: lessons[i].lessonTime,
                teacher: lessons[i].teacher.name,
              };

              monthArray[startDayDate].push(lessonData);

              startDayDate += 7;
            }
          }
        }
      } else {
        for (const sessionLesson of lessons[i].lessonRegistrations) {
          const lessonData = {
            id: lessons[i].id,
            type: lessons[i].type,
            name: lessons[i].name,
            startTime: sessionLesson.startTime,
            lessonTime: lessons[i].lessonTime,
            teacher: lessons[i].teacher.name,
          };

          monthArray[Number(sessionLesson.startDate.toString().slice(8, 10)) - 1].push(lessonData);
        }
      }
    }
    return monthArray;
  }

  async getFilteredLessons(findManyLessonDTO: FindManyByFilterDTO, centerId: number) {
    const lessonQuery = this.lessonRepository
      .createQueryBuilder('lesson')
      .select(['lesson.id', 'lesson.name', 'lesson.type'])
      .leftJoin('lesson.teacher', 'teacher')
      .addSelect(['teacher.name'])
      .leftJoin('lesson.category', 'category')
      .addSelect(['category.name'])
      .where('lesson.centerId = :centerId', { centerId });

    if (findManyLessonDTO.teachers.length > 0 && findManyLessonDTO.categories.length > 0) {
      lessonQuery.andWhere('(teacher.name IN (:teacher) OR lesson.categoryId IN (:category))', {
        teacher: findManyLessonDTO.teachers,
        category: findManyLessonDTO.categories,
      });
    } else if (findManyLessonDTO.teachers.length > 0) {
      lessonQuery.andWhere('teacher.name IN (:teacher)', { teacher: findManyLessonDTO.teachers });
    } else if (findManyLessonDTO.categories.length > 0) {
      lessonQuery.andWhere('lesson.categoryId IN (:category)', { category: findManyLessonDTO.categories });
    }

    const [lessons, total] = await lessonQuery
      .orderBy(`lesson.createdDate`, 'DESC')
      .offset(findManyLessonDTO.getSkip())
      .limit(findManyLessonDTO.getTake())
      .getManyAndCount();

    return {
      lessons: lessons.map(lesson => {
        return {
          id: lesson.id,
          name: lesson.name,
          type: lesson.type,
          teacher: lesson.teacher.name,
          category: lesson.category.name,
        };
      }),
      meta: {
        page: findManyLessonDTO.getPage(),
        take: findManyLessonDTO.getTake(),
        hasNextPage: findManyLessonDTO.hasNextPage(total),
      },
    };
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
}
