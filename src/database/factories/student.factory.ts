import { StudentEntity } from 'src/student/entities/student.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';

export default setSeederFactory(StudentEntity, enFaker => {
  const student = new StudentEntity();
  // student.center = faker.number.int({ min: 1, max: 10 });
  student.name = faker.person.lastName() + faker.person.firstName();
  student.phone = '010' + faker.string.numeric(8);
  // 04월 28일은 내 생일!

  return student;
});
