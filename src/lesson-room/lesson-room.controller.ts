import { Controller } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';

@Controller('room')
export class LessonRoomController {
  constructor(private readonly lessonRoomService: LessonRoomService) {}
}
