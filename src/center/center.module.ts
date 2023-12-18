import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterEntity } from './entities/center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CenterEntity])],
  providers: [CenterService],
})
export class CenterModule {}
