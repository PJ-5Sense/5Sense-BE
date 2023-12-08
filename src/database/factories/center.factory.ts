import { CenterEntity } from 'src/center/entities/center.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(CenterEntity, faker => {
  const center = new CenterEntity();
  center.name = faker.person.fullName();
  center.address = faker.location.city() + ' ' + faker.location.county() + ' ' + faker.location.country();
  center.mainPhone = faker.phone.number('010########');
  center.profile = faker.image.url();
  center.user = faker.number.int({ min: 1, max: 10 });
  return center;
});
