import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialEntity } from './entity/social.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialEntity])],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
