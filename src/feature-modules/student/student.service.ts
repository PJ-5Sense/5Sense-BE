import { StudentRepository } from './student.repository';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/request/create-student.dto';
import { FindStudentsDto } from './dto/request/find-students.dto';
import { ResponseStudentDetailDTO } from './dto/response/student-detail.dto';
import { PageMeta } from 'src/common/dto/response-page.dto';
import { UpdateStudentDto } from './dto/request/update-student.dto';
import { ResponseStudentDTO } from './dto/response/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDTO, centerId: number): Promise<ResponseStudentDTO> {
    if (await this.checkDuplicateStudent(createStudentDto.name, createStudentDto.phone, centerId))
      throw new ConflictException('Duplicate student information');

    const student = await this.studentRepository.create(createStudentDto, centerId);

    return new ResponseStudentDTO(student);
  }

  async findManyByCenterId(
    findStudentsDto: FindStudentsDto,
    centerId: number,
  ): Promise<{ students: ResponseStudentDTO[]; meta: PageMeta }> {
    const [students, total] = await this.studentRepository.findManyByCenterId(findStudentsDto, centerId);

    return {
      students: students.map(student => {
        return new ResponseStudentDTO(student);
      }),

      meta: {
        page: findStudentsDto.getPage(),
        take: findStudentsDto.getTake(),
        hasNextPage: findStudentsDto.hasNextPage(total),
      },
    };
  }

  async findOneByStudentId(studentId: number, centerId: number): Promise<any> {
    const student = await this.studentRepository.findOneByStudentId(studentId, centerId);

    if (student) return new ResponseStudentDetailDTO(student);

    return null;
  }

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 학생 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateStudent(name: string, phone: string, centerId: number): Promise<boolean> {
    return (await this.studentRepository.findExistingStudent(name, phone, centerId)) === null ? false : true;
  }

  async updateStudent(updateStudentDto: UpdateStudentDto, studentId: number, centerId: number): Promise<void> {
    if (!(await this.studentRepository.updateStudent(updateStudentDto, studentId, centerId)))
      throw new BadRequestException('Center information or student information is invalid');
  }
}
