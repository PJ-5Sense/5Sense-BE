import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/request/create-teacher.dto';
import { FindTeachersDto } from './dto/request/find-teachers.dto';
import { ResponseTeacherDto } from './dto/response/teacher.dto';
import { UpdateTeacherDto } from './dto/request/update-teacher.dto';
import { TeacherRepository } from './dao/teacher.dao';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}
  async create(createTeacherDto: CreateTeacherDto, centerId: number) {
    if (await this.checkDuplicateTeacher(createTeacherDto.name, createTeacherDto.phone, centerId))
      throw new ConflictException('Duplicate teacher information');

    const teacher = await this.teacherRepository.create(createTeacherDto, centerId);

    return ResponseTeacherDto.of(teacher);
  }

  async findManyByCenterId(findTeachersDto: FindTeachersDto, centerId: number) {
    const [teachers, total] = await this.teacherRepository.findManyByCenterId(findTeachersDto, centerId);

    return {
      teachers: teachers.map(teacher => {
        return ResponseTeacherDto.of(teacher);
      }),
      meta: {
        page: findTeachersDto.getPage(),
        take: findTeachersDto.getTake(),
        hasNextPage: findTeachersDto.hasNextPage(total),
      },
    };
  }

  async findOneByTeacherId(teacherId: number, centerId: number) {
    const teacher = await this.teacherRepository.findOneByTeacherId(teacherId, centerId);

    return ResponseTeacherDto.of(teacher);
  }

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 강사 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateTeacher(name: string, phone: string, centerId: number): Promise<boolean> {
    return (await this.teacherRepository.findExistingTeacher(name, phone, centerId)) === null ? false : true;
  }

  async updateTeacher(updateTeacher: UpdateTeacherDto, teacherId: number, centerId: number): Promise<void> {
    if (!(await this.teacherRepository.updateTeacher(updateTeacher, teacherId, centerId)))
      throw new BadRequestException('Center information or teacher information is invalid');
  }
}
