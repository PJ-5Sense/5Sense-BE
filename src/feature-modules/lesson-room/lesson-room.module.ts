import { Module } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { LessonRoomController } from './lesson-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRoomEntity } from './entity/lesson-room.entity';
import { LessonRoomRepository } from './lesson-room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRoomEntity])],
  controllers: [LessonRoomController],
  providers: [LessonRoomService, LessonRoomRepository],
  exports: [LessonRoomService],
})
export class LessonRoomModule {}
