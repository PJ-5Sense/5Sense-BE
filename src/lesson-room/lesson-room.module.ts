import { Module } from '@nestjs/common';
import { RoomService } from './lesson-room.service';
import { RoomController } from './lesson-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRoomEntity } from './entities/lesson-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRoomEntity])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
