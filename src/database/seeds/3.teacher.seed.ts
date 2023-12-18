import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';

export class Teacher1702050683984 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const teacherFactory = factoryManager.get(TeacherEntity);

    await teacherFactory.saveMany(10);
  }
}
