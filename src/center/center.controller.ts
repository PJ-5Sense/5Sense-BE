import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { User } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/auth/type/jwt-payload.type';
import { CenterService } from './center.service';

@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Post()
  async create(@Body() createCenterDto: CreateCenterDto, @User() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'The center has been successfully registered',
      data: await this.centerService.create(createCenterDto, userInfo),
    };
  }

  @Get('my')
  async findOneByUserId(@User() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'Successfully getting center information',
      data: await this.centerService.findOneMyCenter(userInfo.userId, userInfo.centerId),
    };
  }
}
