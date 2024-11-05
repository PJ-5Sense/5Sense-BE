import { Module } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { LessonRoomController } from './lesson-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRoomEntity } from './entity/lesson-room.entity';
import { LessonRoomRepository } from './lesson-room.repository';
import { DateHelper } from 'src/common/helper/date.helper';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRoomEntity])],
  controllers: [LessonRoomController],
  providers: [LessonRoomService, LessonRoomRepository, DateHelper],
  exports: [LessonRoomService],
})
export class LessonRoomModule {}
