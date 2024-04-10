import { DataSource, DataSourceOptions } from 'typeorm';
import { ormConfig } from './orm.config';
import { SeederOptions } from 'typeorm-extension';

const seederConfig: DataSourceOptions & SeederOptions = {
  ...ormConfig,
  seedTableName: 'seed',
  seeds: ['./src/common/database/seeds/*{.ts,.js}'],
  factories: ['./src/common/database/factories/*{.ts,.js}'],
};

export const migrationDataSource = new DataSource(seederConfig);
