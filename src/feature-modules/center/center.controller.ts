import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { CreateCenterDTO } from './dto/request/create-center.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/feature-modules/auth/type/jwt-payload.type';
import { CenterService } from './center.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../../common/pipe/resize-image.pipe';
import { UpdateCenterDTO } from './dto/request/update-center.dto';
import { SwaggerCreateCenter, SwaggerMyCenter, SwaggerUpdateCenter } from 'src/swagger/center.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Center - 센터')
@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @SwaggerCreateCenter()
  @Post()
  async create(@Body() createCenterDTO: CreateCenterDTO, @CurrentUser() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'The center has been successfully registered',
      data: await this.centerService.create(createCenterDTO, userInfo),
    };
  }

  @SwaggerMyCenter()
  @Get('my')
  async findOneByUserId(@CurrentUser() userInfo: JwtPayload) {
    return {
      success: true,
      message: 'Successfully getting center information',
      data: await this.centerService.findOneMyCenter(userInfo.userId, userInfo.centerId),
    };
  }

  @SwaggerUpdateCenter()
  @Patch()
  @UseInterceptors(FileInterceptor('profile'))
  async updateCenter(
    @UploadedFile(SharpPipe) profile: string | null,
    @Body() updateCenterDTO: UpdateCenterDTO,
    @CurrentUser() userInfo: JwtPayload,
  ) {
    return {
      success: true,
      message: 'Successfully updating center information',
      data: await this.centerService.updateCenter(profile, updateCenterDTO, userInfo),
    };
  }
}
