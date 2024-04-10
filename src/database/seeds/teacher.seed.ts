import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { TeacherEntity } from 'src/feature-modules/teacher/entity/teacher.entity';

export default class Teacher1702050683984 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const teacherFactory = factoryManager.get(TeacherEntity);

    await teacherFactory.saveMany(100);
  }
}
