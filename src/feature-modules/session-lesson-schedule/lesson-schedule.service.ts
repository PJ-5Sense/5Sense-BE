import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SessionScheduleRepository } from './session-schedule.repository';
import { CreateSessionScheduleDTO } from './dto/request/create-session-schedule.dto';
import { SessionLessonRegistrationService } from '../session-lesson-registration/session-registration.service';

@Injectable()
export class SessionLessonScheduleService {
  constructor(
    private readonly sessionScheduleRepository: SessionScheduleRepository,
    private readonly sessionLessonRegistrationService: SessionLessonRegistrationService,
  ) {}

  async create(createSessionScheduleDTO: CreateSessionScheduleDTO) {
    // 처리해야할 목록
    const { lessonId, ...registrationData } = createSessionScheduleDTO;
    // 1. 학생이 그 날에 예약을 이미 했다면 에러만들어주기
    const studentRegistration = await this.sessionLessonRegistrationService.findOne(
      lessonId,
      createSessionScheduleDTO.studentId,
    );

    if (!studentRegistration) {
      throw new NotFoundException('해당 학생/클래스 등록 정보가 없습니다.');
    } else {
      studentRegistration.sessionSchedules.map(schedule => {
        if (this.isSameDay(schedule.sessionDate, new Date(registrationData.sessionDate))) {
          if (schedule.startTime.slice(0, 5) === createSessionScheduleDTO.startTime) {
            throw new ConflictException(`이미 해당 시간에 예약이 되어있습니다`);
          }
        }
      });
    }

    await this.sessionScheduleRepository.create({
      ...registrationData,
      sessionRegistrationId: studentRegistration.id,
    });
  }

  /**
   * 두 날짜가 같은 '날'인지 확인합니다.
   * @param date1 ISO 문자열
   * @param date2 ISO 문자열
   * @returns boolean 같은 날이면 true, 다르면 false
   */
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
