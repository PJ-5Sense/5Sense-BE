import { StudentRepository } from './student.repository';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/request/create-student.dto';
import { FindStudentsDTO } from './dto/request/find-students.dto';
import { ResponseStudentDetailDTO } from './dto/response/student-detail.dto';
import { PageMeta } from 'src/common/dto/response-page.dto';
import { UpdateStudentDTO } from './dto/request/update-student.dto';
import { ResponseStudentDTO } from './dto/response/student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(createStudentDTO: CreateStudentDTO, centerId: number): Promise<ResponseStudentDTO> {
    if (await this.checkDuplicateStudent(createStudentDTO.name, createStudentDTO.phone, centerId))
      throw new ConflictException('Duplicate student information');

    const student = await this.studentRepository.create(createStudentDTO, centerId);

    return new ResponseStudentDTO(student);
  }

  async findManyByCenterId(
    findStudentsDTO: FindStudentsDTO,
    centerId: number,
  ): Promise<{ students: ResponseStudentDTO[]; meta: PageMeta }> {
    const [students, total] = await this.studentRepository.findManyByCenterId(findStudentsDTO, centerId);

    return {
      students: students.map(student => {
        return new ResponseStudentDTO(student);
      }),

      meta: {
        page: findStudentsDTO.getPage(),
        take: findStudentsDTO.getTake(),
        hasNextPage: findStudentsDTO.hasNextPage(total),
      },
    };
  }

  /**
   * 해당 레슨에 등록되어있는 학생들 목록만 보여줌
   * @param lessonId
   * @param centerId
   * @returns
   */
  async findManyForLesson(lessonId: number, centerId: number) {
    const students = await this.studentRepository.findManyForLesson(lessonId, centerId);

    return students.map(student => new ResponseStudentDTO(student));
  }
  async findOneByStudentId(studentId: number, centerId: number) {
    const student = await this.studentRepository.findOneByStudentId(studentId, centerId);

    return new ResponseStudentDetailDTO(student);
  }

  /**
   * @description 이름과 휴대번호를 가지고 이미 등록된 학생 정보 여부를 확인하는 함수
   *
   * @returns 중복된 경우 true, 중복되지 않은 경우 false 리턴함
   */
  private async checkDuplicateStudent(name: string, phone: string, centerId: number): Promise<boolean> {
    return (await this.studentRepository.findExistingStudent(name, phone, centerId)) === null ? false : true;
  }

  async updateStudent(updateStudentDTO: UpdateStudentDTO, studentId: number, centerId: number): Promise<void> {
    if (!(await this.studentRepository.updateStudent(updateStudentDTO, studentId, centerId)))
      throw new BadRequestException('Center information or student information is invalid');
  }
}
