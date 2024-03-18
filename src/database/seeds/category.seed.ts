import { CategoryEntity } from 'src/lesson-category/entities/category.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class Category1702021555297 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const major = ['미술', '보컬', '댄스', '악기 연주', '체육', '작곡 프로듀싱', '공연', '연기', '기타']; // 대분류의 기타는 9번으로 고정
    const sub = [
      ['아크릴화', '수채화', '유화', '디지털 드로잉', '이색 드로잉', '캘리그라피'],
      ['재즈', '실용음악', '뮤지컬'],
      ['방송댄스', '발레', '폴댄스', '스윙댄스', '이색 댄스'],
      ['기타', '피아노', '현악기', '국악기', '드럼', '이색 악기'],
      ['클라이밍', '실내다이빙', '라켓스포츠', '구기스포츠', '무도', '수영', '겨울스포츠', '이색스포츠'],
      ['프로듀싱', '작곡 & 작사', '디제잉'],
    ];

    const categoryFactory = dataSource.getRepository(CategoryEntity);
    for (let i = 0; i < major.length; i++) await categoryFactory.save({ name: major[i] });
    for (let i = 0; i < sub.length; i++) {
      for (let j = 0; j < sub[i].length; j++) {
        await categoryFactory.save({ name: sub[i][j], parentId: i + 1, parentName: major[i] });
      }
    }
  }
}
