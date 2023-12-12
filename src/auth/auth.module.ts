import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { AuthDao } from './dao/auth.dao';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthDao],
})
export class AuthModule {}
