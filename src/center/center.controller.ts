import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { User } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CENTER_SERVICE, ICenterService } from './center.service.interface';

@Controller('center')
export class CenterController {
  constructor(@Inject(CENTER_SERVICE) private readonly centerService: ICenterService) {}

  @Post()
  async create(@Body() createCenterDto: CreateCenterDto, @User() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'Center has been registered',
      data: await this.centerService.create(createCenterDto, userInfo),
    };
  }
}
