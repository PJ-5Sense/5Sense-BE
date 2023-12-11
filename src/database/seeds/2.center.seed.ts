import { CenterEntity } from 'src/center/entities/center.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';

export default class Center1701866900068 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const centerFactory = dataSource.getRepository(CenterEntity);

    for (let i = 0; i < 10; i++) {
      const center = new CenterEntity();
      center.name = faker.person.lastName() + faker.person.firstName();
      center.address = `${faker.location.state()} ${faker.location.city()} ${faker.location.street()} ${faker.location.secondaryAddress()}`;
      center.mainPhone = '010' + faker.string.numeric(8);
      center.profile = faker.image.url();
      center.user = i + 1;

      await centerFactory.save(center);
    }
  }
}
