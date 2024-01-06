import { StudentEntity } from 'src/student/entities/student.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class Student1701866831258 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const studentFactory = factoryManager.get(StudentEntity);

    await studentFactory.saveMany(100);
  }
}
