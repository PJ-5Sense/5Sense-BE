import { Injectable } from '@nestjs/common';
import { CreateCenterRoomDTO } from './dto/request/create-room.dto';
import { UpdateCenterRoomDTO } from './dto/request/update-room.dto';
import { LessonType } from '../combined-lesson/type/lesson.type';
import { LessonRoomRepository } from './lesson-room.repository';
import { GetDailySchedulesDTO } from './dto/request/get-daily-schedules.dto';
import { JwtPayload } from '../auth/type/jwt-payload.type';
import { ResponseRoomScheduleDTO } from './dto/response/room-schedule.dto';
import { GetRangeSchedulesDTO } from './dto/request/get-range-schedule.dto';
import { DateHelper } from 'src/common/helper/date.helper';

@Injectable()
export class LessonRoomService {
  constructor(private readonly lessonRoomRepository: LessonRoomRepository, private readonly dateHelper: DateHelper) {}
  async addDefaultRoomForNewCenter(centerId: number) {
    return await this.lessonRoomRepository.addDefaultRoomForNewCenter(centerId);
  }

  async crete(createCenterRoomDTO: CreateCenterRoomDTO, centerId: number) {
    return await this.lessonRoomRepository.save(createCenterRoomDTO, centerId);
  }

  async update(id: number, centerId: number, updateCenterRoomDTO: UpdateCenterRoomDTO) {
    return await this.lessonRoomRepository.update(id, centerId, updateCenterRoomDTO);
  }

  /**
   * 강의실 삭제 조건
   * 1. 수강중인 강의실이 없어야함
   * 2. 종료된 클래스에서 사용했다면 해당 정보는 어떻게 해야하지?
   *
   * @param id
   * @param centerId
   * @returns
   */
  async delete(id: number, centerId: number) {
    // TODO : 종료된 클래스에 정보가 있다면 어떻게 해야할지 논의하기

    return await this.lessonRoomRepository.delete(id, centerId);
  }

  async getSchedulesDaily(getDailySchedulesDTO: GetDailySchedulesDTO, jwtPayload: JwtPayload) {
    const schedulesOfRooms = await this.lessonRoomRepository.getMany(
      new Date(getDailySchedulesDTO.date),
      new Date(getDailySchedulesDTO.date),
      jwtPayload.centerId,
    );
    const startTimeParts = jwtPayload.open.split(':').map(Number);
    const endTimeParts = jwtPayload.close.split(':').map(Number);
    const rooms: ResponseRoomScheduleDTO[] = [];
    const targetDay = this.dateHelper.extractDayName(new Date(getDailySchedulesDTO.date));

    // 각 룸 정보 초기화
    for (let i = 0; i < schedulesOfRooms.length; i++) {
      rooms[i] = {
        id: schedulesOfRooms[i].id,
        name: schedulesOfRooms[i].name,
        capacity: schedulesOfRooms[i].capacity,
        workTime: {},
      };

      // 해당 학원의 근무시간 기간을 시간 단위로 객체 초기화
      for (let hour = startTimeParts[0]; hour < endTimeParts[0]; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          // 빈 경우 예약 가능 상태만 할당
          rooms[i].workTime[timeString] = {
            id: null,
            type: null,
            name: null,
            lessonTime: null,
            teacher: null,
            isOpenForBooking: true,
          };
        }
      }
      for (const schedules of schedulesOfRooms[i].durationSchedules) {
        if (schedules.repeatDate.includes(targetDay)) {
          const [hour, minutes] = schedules.startTime.split(':').map(Number);
          const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

          // 해당 시간의 정보가 초기화 되어 있지 않다면 초기화 시작
          if (rooms[i].workTime[timeString] !== undefined && !rooms[i].workTime[timeString].id) {
            rooms[i].workTime[timeString] = {
              id: schedules.durationLesson.id,
              type: LessonType.DURATION,
              name: schedules.durationLesson.name,
              lessonTime: schedules.lessonTime,
              teacher: schedules.durationLesson.teacher.name,
              isOpenForBooking: false,
            };
          }
        }
      }

      for (const schedules of schedulesOfRooms[i].sessionSchedules) {
        const [hour, minutes] = schedules.startTime.split(':').map(Number);
        const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        // 해당 시간의 정보가 초기화 되어 있지 않다면 초기화 시작
        if (rooms[i].workTime[timeString] !== undefined && !rooms[i].workTime[timeString].id) {
          // 클래스에 예약이 된 학생 수 카운트
          const studentCount = schedulesOfRooms[i].sessionSchedules.filter(sessionSchedule => {
            if (
              sessionSchedule.startTime === schedules.startTime &&
              sessionSchedule.endTime === schedules.endTime &&
              sessionSchedule.sessionRegistration.lessonId === schedules.sessionRegistration.lessonId
            ) {
              return true;
            } else return false;
          }).length;
          const capacity = schedules.sessionRegistration.sessionLesson.capacity;
          const isOpenForBooking = studentCount < capacity;

          rooms[i].workTime[timeString] = {
            id: schedules.sessionRegistration.sessionLesson.id,
            type: LessonType.SESSION,
            name: schedules.sessionRegistration.sessionLesson.name,
            lessonTime: schedules.sessionRegistration.sessionLesson.lessonTime,
            teacher: schedules.sessionRegistration.sessionLesson.teacher.name,
            capacity,
            studentCount,
            isOpenForBooking,
          };
        }
      }
    }
    return rooms;
  }

  async getSchedulesWithinRange(getRangeSchedulesDTO: GetRangeSchedulesDTO, jwtPayload: JwtPayload) {
    const schedulesOfRooms = await this.lessonRoomRepository.getMany(
      new Date(getRangeSchedulesDTO.startDate),
      new Date(getRangeSchedulesDTO.endDate),
      jwtPayload.centerId,
    );
    // 요구사항 Lesson Time도 추가해주세요

    const startTimeParts = jwtPayload.open.split(':').map(Number);
    const endTimeParts = jwtPayload.close.split(':').map(Number);
    const rooms: any[] = [];

    // 각 룸 정보 초기화
    for (let i = 0; i < schedulesOfRooms.length; i++) {
      rooms[i] = {
        id: schedulesOfRooms[i].id,
        name: schedulesOfRooms[i].name,
        capacity: schedulesOfRooms[i].capacity,
        workTime: {},
      };

      // 해당 학원의 근무시간 기간을 시간 단위로 객체 초기화
      for (let hour = startTimeParts[0]; hour < endTimeParts[0]; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          // 빈 경우 예약 가능 상태만 할당
          rooms[i].workTime[timeString] = {
            id: null,
            isOpenForBooking: true,
          };
        }
      }
      for (const schedules of schedulesOfRooms[i].durationSchedules) {
        const repeatDates = schedules.repeatDate.split(',');
        for (let j = 0; j < repeatDates.length; j++) {
          // 반복 요일이 겹치는 경우 예약 불가능 상태로 변경
          if (getRangeSchedulesDTO.repeatDate.includes(repeatDates[j])) {
            const [hour, minutes] = schedules.startTime.split(':').map(Number);
            const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            if (rooms[i].workTime[timeString] !== undefined && !rooms[i].workTime[timeString].id) {
              rooms[i].workTime[timeString].id = schedules.durationLesson.id;
              rooms[i].workTime[timeString].isOpenForBooking = false;
              rooms[i].workTime[timeString].lessonTime = schedules.lessonTime;
              rooms[i].workTime[timeString].type = LessonType.DURATION;
            }
          }
          break;
        }
      }

      for (const schedules of schedulesOfRooms[i].sessionSchedules) {
        if (getRangeSchedulesDTO.repeatDate.includes(this.dateHelper.extractDayName(schedules.sessionDate))) {
          const [hour, minutes] = schedules.startTime.split(':').map(Number);
          const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

          if (rooms[i].workTime[timeString] !== undefined && !rooms[i].workTime[timeString].id) {
            rooms[i].workTime[timeString] = {
              id: schedules.sessionRegistration.sessionLesson.id,
              isOpenForBooking: false,
              lessonTime: schedules.sessionRegistration.sessionLesson.lessonTime,
              type: LessonType.SESSION,
            };
          }
        }
      }
    }
    return rooms;
  }
}
