import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entity/student.entity';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
