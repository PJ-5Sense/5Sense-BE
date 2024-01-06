import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { STUDENT_SERVICE } from './student.service.interface';
import { StudentServiceImpl } from './student.service';
import { STUDENT_DAO } from './dao/student.dao.interface';
import { StudentDaoImpl } from './dao/student.dao';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [
    {
      provide: STUDENT_SERVICE,
      useClass: StudentServiceImpl,
    },
    {
      provide: STUDENT_DAO,
      useClass: StudentDaoImpl,
    },
  ],
})
export class StudentModule {}
