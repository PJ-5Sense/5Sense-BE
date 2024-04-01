import { Body, Controller, Post } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { CreateCenterRoomDTO } from './dto/create-room.dto';
import { CurrentUser } from '../common/decorator/user.decorator';

@Controller('lesson-rooms')
export class LessonRoomController {
  constructor(private readonly lessonRoomService: LessonRoomService) {}

  @Post()
  async createRoom(@Body() createCenterRoomDTO: CreateCenterRoomDTO, @CurrentUser('centerId') centerId: number) {
    await this.lessonRoomService.crete(createCenterRoomDTO, centerId);

    return {
      success: true,
      message: `The lesson room has been successfully registered`,
    };
  }
}
