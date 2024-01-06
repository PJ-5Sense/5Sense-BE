import { Module } from '@nestjs/common';
import { UserServiceImpl } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDao } from './dao/user.dao';
import { USER_SERVICE } from './user.service.interface';
import { USER_DAO } from './dao/user.dao.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserServiceImpl,
    },
    {
      provide: USER_DAO,
      useClass: UserDao,
    },
  ],
  exports: [
    {
      provide: USER_SERVICE,
      useClass: UserServiceImpl,
    },
  ],
})
export class UserModule {}
