import { UserEntity } from 'src/feature-modules/user/entity/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';

export default setSeederFactory(UserEntity, enFaker => {
  const user = new UserEntity();
  user.email = enFaker.internet.email();
  user.name = faker.person.lastName() + faker.person.firstName();
  user.phone = '010' + faker.string.numeric(8);
  user.profile = faker.image.url();

  return user;
});
