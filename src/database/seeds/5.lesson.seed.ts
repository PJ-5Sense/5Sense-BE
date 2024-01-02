import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class LessonSeed1702051029391 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    // 클래스 등록 시점과 학생 등록은 같은 시점
    // 클래스 이름, 클래스 메모, 클래스 타입, 클래스 반복요일?
  }
}
