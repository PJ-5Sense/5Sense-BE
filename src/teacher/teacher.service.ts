import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/request/create-teacher.dto';
import { ITeacherService } from './teacher.service.interface';
import { ITeacherDao, TEACHER_DAO } from './dao/teacher.dao.interface';
import { FindTeachersDto } from './dto/request/find-teachers.dto';
import { ResponseTeacherDto } from './dto/response/teacher.dto';

@Injectable()
export class TeacherServiceImpl implements ITeacherService {
  constructor(@Inject(TEACHER_DAO) private readonly teacherDao: ITeacherDao) {}
  async create(createTeacherDto: CreateTeacherDto, centerId: number) {
    if (await this.checkDuplicateTeacher(createTeacherDto.name, createTeacherDto.phone, centerId))
      throw new ConflictException('Duplicate teacher information');

    const teacher = await this.teacherDao.create(createTeacherDto, centerId);

    return ResponseTeacherDto.of(teacher);
  }

  async findManyByCenterId(findTeachersDto: FindTeachersDto, centerId: number) {
    const [teachers, total] = await this.teacherDao.findManyByCenterId(findTeachersDto, centerId);

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

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 강사 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateTeacher(name: string, phone: string, centerId: number): Promise<boolean> {
    return (await this.teacherDao.findExistingTeacher(name, phone, centerId)) === null ? false : true;
  }
}
