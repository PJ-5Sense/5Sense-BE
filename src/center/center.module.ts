import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterEntity } from './entities/center.entity';
import { CenterController } from './center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CenterEntity])],
  controllers: [CenterController],
  providers: [CenterService],
})
export class CenterModule {}
