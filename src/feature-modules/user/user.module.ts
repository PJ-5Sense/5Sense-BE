import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SocialModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
