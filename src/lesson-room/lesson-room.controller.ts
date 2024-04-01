import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { CreateCenterRoomDTO } from './dto/create-room.dto';
import { CurrentUser } from '../common/decorator/user.decorator';
import { UpdateCenterRoomDTO } from './dto/update-room.dto';

@Controller('lesson-rooms')
export class LessonRoomController {
  constructor(private readonly lessonRoomService: LessonRoomService) {}

  @Post()
  async createRoom(@Body() createCenterRoomDTO: CreateCenterRoomDTO, @CurrentUser('centerId') centerId: number) {
    await this.lessonRoomService.crete(createCenterRoomDTO, centerId);

    return {
      success: true,
      message: 'The lesson room has been successfully created',
    };
  }

  @Put('/:roomId')
  async updateRoom(
    @Body() updateCenterRoomDTO: UpdateCenterRoomDTO,
    @Param('roomId') id: number,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.lessonRoomService.update(id, centerId, updateCenterRoomDTO);

    return {
      success: true,
      message: `The lesson room has been successfully updated`,
    };
  }
}
