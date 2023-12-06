import { UserEntity } from 'src/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserEntity, faker => {
  const user = new UserEntity();
  user.email = faker.internet.email();
  user.name = faker.person.fullName();

  return user;
});
