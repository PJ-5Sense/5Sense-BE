import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonRoomEntity } from './entity/lesson-room.entity';
import { Repository } from 'typeorm';
import { CreateCenterRoomDTO } from './dto/create-room.dto';
import { UpdateCenterRoomDTO } from './dto/update-room.dto';

@Injectable()
export class LessonRoomService {
  constructor(
    @InjectRepository(LessonRoomEntity) private readonly lessonRoomRepository: Repository<LessonRoomEntity>,
  ) {}
  async addDefaultRoomForNewCenter(centerId: number) {
    return await this.lessonRoomRepository.save({ centerId, name: 'A 룸', capacity: 20 });
  }

  async crete(createCenterRoomDTO: CreateCenterRoomDTO, centerId: number) {
    return await this.lessonRoomRepository.save({ ...createCenterRoomDTO, centerId });
  }

  async update(id: number, centerId: number, updateCenterRoomDTO: UpdateCenterRoomDTO) {
    return await this.lessonRoomRepository.update({ id, centerId }, { ...updateCenterRoomDTO });
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

    return await this.lessonRoomRepository.delete({ id, centerId });
  }
}
