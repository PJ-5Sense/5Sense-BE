import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonRoomEntity } from './entities/lesson-room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonRoomService {
  constructor(
    @InjectRepository(LessonRoomEntity) private readonly lessonRoomRepository: Repository<LessonRoomEntity>,
  ) {}
  async addDefaultRoomForNewCenter(centerId: number) {
    return await this.lessonRoomRepository.save({ centerId, name: 'A 룸', capacity: 20 });
  }
}
