import { Module } from '@nestjs/common';
import { CenterServiceImpl } from './center.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterEntity } from './entities/center.entity';
import { CenterController } from './center.controller';
import { CENTER_SERVICE } from './center.service.interface';
import { CENTER_DAO } from './dao/center.dao.interface';
import { CenterDaoImpl } from './dao/center.dao';

@Module({
  imports: [TypeOrmModule.forFeature([CenterEntity])],
  controllers: [CenterController],
  providers: [
    { provide: CENTER_SERVICE, useClass: CenterServiceImpl },
    { provide: CENTER_DAO, useClass: CenterDaoImpl },
  ],
})
export class CenterModule {}
