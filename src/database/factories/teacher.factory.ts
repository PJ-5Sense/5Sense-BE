import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';

export default setSeederFactory(TeacherEntity, enFaker => {
  const genders = ['남성', '여성'];
  const teacher = new TeacherEntity();
  teacher.center = faker.number.int({ min: 1, max: 10 });
  teacher.name = faker.person.lastName() + faker.person.firstName();
  teacher.phone = '010' + faker.string.numeric(8);
  teacher.profile = faker.image.url();
  // 04월 28일은 내 생일!
  teacher.gender = genders[faker.number.int({ min: 4, max: 28 }) % 2];

  return teacher;
});
