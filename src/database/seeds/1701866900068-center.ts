import { CenterEntity } from 'src/center/entities/center.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class Center1701866900068 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const centerFactory = factoryManager.get(CenterEntity);

    await centerFactory.saveMany(10);
  }
}
