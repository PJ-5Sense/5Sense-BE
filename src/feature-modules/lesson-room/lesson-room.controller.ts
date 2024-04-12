import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { CreateCenterRoomDTO } from './dto/create-room.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
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

  // 강의실 삭제에 관한 회의가 필요함
  // 논의 포인트 1. 기존의 강의실에서 수강하고 있는 내역들은 어떻게 해야하는가? -> 삭제는 강의실을 사용하지 않는 경우에만 삭제가 가능하도록 한다.
  // 결국 안쓰는 강의실을 삭제하겠다는 관리자의 의도이기에 수강중인 내역들이 있으면 삭제 불가능, 바꿀게 있으면 수정을 이용하자
  @Delete('/:roomId')
  async deleteRoom(@Param('roomId') id: number, @CurrentUser('centerId') centerId: number) {
    await this.lessonRoomService.delete(id, centerId);

    return {
      success: true,
      message: 'The lesson room has been successfully deleted',
    };
  }
}