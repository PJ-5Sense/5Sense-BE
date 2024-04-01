import { Controller } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';

@Controller('lesson-room')
export class LessonRoomController {
  constructor(private readonly lessonRoomService: LessonRoomService) {}
  // 강의실의 예약 현황을 가져와야하는데...
}
