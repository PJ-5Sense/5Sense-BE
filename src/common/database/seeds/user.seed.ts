import { UserEntity } from 'src/feature-modules/user/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class User1700837711045 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userFactory = factoryManager.get(UserEntity);

    await userFactory.saveMany(10);
  }
}
