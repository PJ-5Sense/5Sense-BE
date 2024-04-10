import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/feature-modules/auth/type/jwt-payload.type';
import { CenterService } from './center.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../../common/pipe/resize-image.pipe';

@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Post()
  async create(@Body() createCenterDto: CreateCenterDto, @CurrentUser() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'The center has been successfully registered',
      data: await this.centerService.create(createCenterDto, userInfo),
    };
  }

  @Get('my')
  async findOneByUserId(@UploadedFile(SharpPipe) image: string, @CurrentUser() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'Successfully getting center information',
      data: await this.centerService.findOneMyCenter(userInfo.userId, userInfo.centerId),
    };
  }

  @Patch()
  @UseInterceptors(FileInterceptor('image'))
  async updateCenter() {}
}
