import { StudentEntity } from 'src/student/entities/student.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';

export default setSeederFactory(StudentEntity, enFaker => {
  const genders = ['남성', '여성'];
  const student = new StudentEntity();
  student.center = faker.number.int({ min: 1, max: 10 });
  student.name = faker.person.lastName() + faker.person.firstName();
  student.phone = '010' + faker.string.numeric(8);
  student.profile = faker.image.url();
  // 04월 28일은 내 생일!
  student.gender = genders[faker.number.int({ min: 4, max: 28 }) % 2];

  return student;
});
