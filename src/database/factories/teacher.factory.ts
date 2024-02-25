import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';

export default setSeederFactory(TeacherEntity, enFaker => {
  const teacher = new TeacherEntity();
  teacher.name = faker.person.lastName() + faker.person.firstName();
  teacher.phone = '010' + faker.string.numeric(8);

  teacher.centerId = 1;

  return teacher;
});
