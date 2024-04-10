import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterEntity } from './entity/center.entity';
import { CenterController } from './center.controller';
import { LessonRoomModule } from 'src/feature-modules/lesson-room/lesson-room.module';
import { CenterService } from './center.service';
import { CenterRepository } from './center.repository';
import { S3Helper } from 'src/common/helper/s3.helper';

@Module({
  imports: [TypeOrmModule.forFeature([CenterEntity]), LessonRoomModule],
  controllers: [CenterController],
  providers: [CenterService, CenterRepository, S3Helper],
})
export class CenterModule {}
