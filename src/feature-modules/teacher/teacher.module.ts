import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './entity/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository],
})
export class TeacherModule {}
