import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IStudentDao, STUDENT_DAO } from './dao/student.dao.interface';
import { IStudentService } from './student.service.interface';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentServiceImpl implements IStudentService {
  constructor(@Inject(STUDENT_DAO) private readonly studentDao: IStudentDao) {}

  async create(createStudentDto: CreateStudentDto, centerId: number) {
    if (await this.checkDuplicateStudent(createStudentDto.name, createStudentDto.phone))
      throw new ConflictException('Duplicate student information');

    const student = await this.studentDao.create(createStudentDto, centerId);

    return {
      name: student.name,
      phone: student.phone,
      particulars: student.particulars,
    };
  }

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 학생 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateStudent(name: string, phone: string): Promise<boolean> {
    return (await this.studentDao.findExistingStudent(name, phone)) === null ? false : true;
  }
}
