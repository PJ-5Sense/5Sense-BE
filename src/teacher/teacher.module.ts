import { Module } from '@nestjs/common';
import { TeacherServiceImpl } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { TEACHER_SERVICE } from './teacher.service.interface';
import { TEACHER_DAO } from './dao/teacher.dao.interface';
import { TeacherDaoImpl } from './dao/teacher.dao';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity])],
  controllers: [TeacherController],
  providers: [
    {
      provide: TEACHER_SERVICE,
      useClass: TeacherServiceImpl,
    },
    {
      provide: TEACHER_DAO,
      useClass: TeacherDaoImpl,
    },
  ],
})
export class TeacherModule {}
