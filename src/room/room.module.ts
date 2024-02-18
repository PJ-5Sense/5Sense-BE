import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { RoomReservationModule } from './room-reservation/room-reservation.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), RoomReservationModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
