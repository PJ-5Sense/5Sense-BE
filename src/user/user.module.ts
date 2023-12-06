import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SocialLoginModule } from 'src/social-login/social-login.module';
import { CenterModule } from 'src/center/center.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SocialLoginModule, CenterModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
