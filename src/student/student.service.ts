import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IStudentDao, STUDENT_DAO } from './dao/student.dao.interface';
import { IStudentService } from './student.service.interface';
import { CreateStudentDto } from './dto/request/create-student.dto';
import { FindStudentsDto } from './dto/request/find-students.dto';
import { ResponseStudentDto } from './dto/response/student.dto';

@Injectable()
export class StudentServiceImpl implements IStudentService {
  constructor(@Inject(STUDENT_DAO) private readonly studentDao: IStudentDao) {}

  async create(createStudentDto: CreateStudentDto, centerId: number) {
    if (await this.checkDuplicateStudent(createStudentDto.name, createStudentDto.phone, centerId))
      throw new ConflictException('Duplicate student information');

    const student = await this.studentDao.create(createStudentDto, centerId);

    return ResponseStudentDto.of(student);
  }

  async findManyByCenterId(findStudentsDto: FindStudentsDto, centerId: number) {
    const [students, total] = await this.studentDao.findManyByCenterId(findStudentsDto, centerId);

    return {
      students: students.map(student => {
        return ResponseStudentDto.of(student);
      }),

      meta: {
        page: findStudentsDto.getPage(),
        take: findStudentsDto.getTake(),
        hasNextPage: findStudentsDto.hasNextPage(total),
      },
    };
  }

  async findOneByStudentId(studentId: number, centerId: number) {
    const student = await this.studentDao.findOneByStudentId(studentId, centerId);

    return ResponseStudentDto.of(student);
  }

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 학생 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateStudent(name: string, phone: string, centerId: number): Promise<boolean> {
    return (await this.studentDao.findExistingStudent(name, phone, centerId)) === null ? false : true;
  }
}
