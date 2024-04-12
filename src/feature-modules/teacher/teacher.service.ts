import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTeacherDTO } from './dto/request/create-teacher.dto';
import { FindTeachersDTO } from './dto/request/find-teachers.dto';
import { ResponseTeacherDTO } from './dto/response/teacher.dto';
import { UpdateTeacherDTO } from './dto/request/update-teacher.dto';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}
  async create(createTeacherDTO: CreateTeacherDTO, centerId: number) {
    if (await this.checkDuplicateTeacher(createTeacherDTO.name, createTeacherDTO.phone, centerId))
      throw new ConflictException('Duplicate teacher information');

    const teacher = await this.teacherRepository.create(createTeacherDTO, centerId);

    return new ResponseTeacherDTO(teacher);
  }

  async findManyByCenterId(findTeachersDTO: FindTeachersDTO, centerId: number) {
    const [teachers, total] = await this.teacherRepository.findManyByCenterId(findTeachersDTO, centerId);

    return {
      teachers: teachers.map(teacher => {
        return new ResponseTeacherDTO(teacher);
      }),
      meta: {
        page: findTeachersDTO.getPage(),
        take: findTeachersDTO.getTake(),
        hasNextPage: findTeachersDTO.hasNextPage(total),
      },
    };
  }

  async findOneByTeacherId(teacherId: number, centerId: number) {
    const teacher = await this.teacherRepository.findOneByTeacherId(teacherId, centerId);

    return new ResponseTeacherDTO(teacher);
  }

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 강사 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateTeacher(name: string, phone: string, centerId: number): Promise<boolean> {
    return (await this.teacherRepository.findExistingTeacher(name, phone, centerId)) === null ? false : true;
  }

  async updateTeacher(updateTeacherDTO: UpdateTeacherDTO, teacherId: number, centerId: number): Promise<void> {
    if (!(await this.teacherRepository.updateTeacher(updateTeacherDTO, teacherId, centerId)))
      throw new BadRequestException('Center information or teacher information is invalid');
  }
}
