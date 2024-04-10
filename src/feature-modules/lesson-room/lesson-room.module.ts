import { Module } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { LessonRoomController } from './lesson-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRoomEntity } from './entity/lesson-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRoomEntity])],
  controllers: [LessonRoomController],
  providers: [LessonRoomService],
  exports: [LessonRoomService],
})
export class LessonRoomModule {}
