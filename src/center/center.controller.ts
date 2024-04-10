import { Controller, Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/auth/type/jwt-payload.type';
import { CenterService } from './center.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../../common/resize-image.pipe';

@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  async create(
    // @UploadedFile(SharpPipe) image: string,
    @Body() createCenterDto: CreateCenterDto,
    @CurrentUser() userInfo: JwtPayload,
  ) {
    return {
      success: true,
      message: 'The center has been successfully registered',
      data: await this.centerService.create(createCenterDto, userInfo),
    };
  }

  @Get('my')
  async findOneByUserId(@CurrentUser() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'Successfully getting center information',
      data: await this.centerService.findOneMyCenter(userInfo.userId, userInfo.centerId),
    };
  }
}
