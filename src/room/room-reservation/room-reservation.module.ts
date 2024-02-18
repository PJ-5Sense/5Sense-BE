import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomReservationService } from './room-reservation.service';
import { RoomReservationController } from './room-reservation.controller';
import { RoomReservationEntity } from './entities/room-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomReservationEntity])],
  controllers: [RoomReservationController],
  providers: [RoomReservationService],
})
export class RoomReservationModule {}
