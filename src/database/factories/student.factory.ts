import { StudentEntity } from 'src/student/entities/student.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(StudentEntity, faker => {
  const student = new StudentEntity();
  // student.email = faker.internet.email();
  // student.name = faker.person.fullName();

  return student;
});
