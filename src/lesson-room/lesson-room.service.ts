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
}
