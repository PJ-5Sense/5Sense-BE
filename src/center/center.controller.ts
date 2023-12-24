import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { User } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Post()
  create(@Body() createCenterDto: CreateCenterDto, @User() user: JwtPayload) {
    return this.centerService.create(createCenterDto);
  }

  @Get()
  findAll() {
    return this.centerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centerService.update(+id, updateCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centerService.remove(+id);
  }
}
