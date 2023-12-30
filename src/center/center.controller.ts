import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { User } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CENTER_SERVICE, ICenterService } from './center.service.interface';

@Controller('centers')
export class CenterController {
  constructor(@Inject(CENTER_SERVICE) private readonly centerService: ICenterService) {}

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
