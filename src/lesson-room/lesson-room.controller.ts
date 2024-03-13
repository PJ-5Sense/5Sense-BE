import { Controller } from '@nestjs/common';
import { RoomService } from './lesson-room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
}
