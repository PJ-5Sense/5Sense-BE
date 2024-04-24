import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LessonRoomService } from './lesson-room.service';
import { CreateCenterRoomDTO } from './dto/request/create-room.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { UpdateCenterRoomDTO } from './dto/request/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerCreateLessonRoom,
  SwaggerDeleteLessonRoom,
  SwaggerGetDailyLessonRoomSchedule,
  SwaggerUpdateLessonRoom,
} from 'src/swagger/lesson-room.swagger';
import { GetDailySchedulesDTO } from './dto/request/get-daily-schedules.dto';
import { GetRangeSchedulesDTO } from './dto/request/get-range-schedule.dto';
import { JwtPayload } from '../auth/type/jwt-payload.type';

@ApiTags('Lesson Room - 강의실')
@Controller('lesson-rooms')
export class LessonRoomController {
  constructor(private readonly lessonRoomService: LessonRoomService) {}

  @SwaggerCreateLessonRoom()
  @Post()
  async createRoom(@Body() createCenterRoomDTO: CreateCenterRoomDTO, @CurrentUser('centerId') centerId: number) {
    await this.lessonRoomService.crete(createCenterRoomDTO, centerId);

    return {
      success: true,
      message: 'The lesson room has been successfully created',
    };
  }

  @SwaggerUpdateLessonRoom()
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
  @SwaggerDeleteLessonRoom()
  @Delete('/:roomId')
  async deleteRoom(@Param('roomId') id: number, @CurrentUser('centerId') centerId: number) {
    await this.lessonRoomService.delete(id, centerId);

    return {
      success: true,
      message: 'The lesson room has been successfully deleted',
    };
  }

  @SwaggerGetDailyLessonRoomSchedule()
  @Get('daily')
  // TODO : 학원의 장사 시간을 반영해야함
  async getDailySchedules(@Query() getDailySchedulesDTO: GetDailySchedulesDTO, @CurrentUser() jwtPayload: JwtPayload) {
    return {
      success: true,
      message: 'Successfully getting daily schedules',
      data: await this.lessonRoomService.getSchedulesDaily(getDailySchedulesDTO, jwtPayload),
    };
  }

  @Get('range')
  async getSchedulesWithinRange(
    @Query() getRangeSchedulesDTO: GetRangeSchedulesDTO,
    @CurrentUser() jwtPayload: JwtPayload,
  ) {
    return {
      success: true,
      message: 'Successfully getting schedules within range',
      data: await this.lessonRoomService.getSchedulesWithinRange(getRangeSchedulesDTO, jwtPayload),
    };
  }
}
