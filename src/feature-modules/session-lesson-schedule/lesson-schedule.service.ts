import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SessionScheduleRepository } from './session-schedule.repository';
import { CreateSessionScheduleDTO } from './dto/request/create-session-schedule.dto';
import { SessionLessonRegistrationService } from '../session-lesson-registration/session-registration.service';
import { DateHelper } from 'src/common/helper/date.helper';

@Injectable()
export class SessionLessonScheduleService {
  constructor(
    private readonly sessionScheduleRepository: SessionScheduleRepository,
    private readonly sessionLessonRegistrationService: SessionLessonRegistrationService,
    private readonly dateHelper: DateHelper,
  ) {}

  async create(createSessionScheduleDTO: CreateSessionScheduleDTO) {
    // 처리해야할 목록
    const { lessonId, ...registrationData } = createSessionScheduleDTO;
    // 1. 학생이 그 날에 예약을 이미 했다면 에러만들어주기
    const studentRegistration = await this.sessionLessonRegistrationService.findOne(
      lessonId,
      createSessionScheduleDTO.studentId,
    );

    // 해당 시간에 예약이 되어있으면 예약 못하게 해야함

    if (!studentRegistration) {
      throw new NotFoundException('해당 학생/클래스 등록 정보가 없습니다.');
    } else {
      studentRegistration.sessionSchedules.map(schedule => {
        if (this.dateHelper.isSameDay(schedule.sessionDate, new Date(registrationData.sessionDate))) {
          if (schedule.startTime.slice(0, 5) === createSessionScheduleDTO.startTime) {
            throw new ConflictException(
              `해당 ${createSessionScheduleDTO.startTime}시에 동일한 학생 예약이 존재합니다.`,
            );
          }
        }
      });
    }

    await this.sessionScheduleRepository.create({
      ...registrationData,
      sessionRegistrationId: studentRegistration.id,
    });
  }
}
