import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/ko';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { LessonType } from 'src/lesson/types/lesson.type';

export default setSeederFactory(LessonEntity, enFaker => {
  const lessonType = [LessonType.DURATION, LessonType.SESSION];
  const lesson = new LessonEntity();

  const weekdaysSet = new Set();

  for (let i = 0; i < 7; i++) {
    const weekday = faker.date.weekday({ abbreviated: true });
    weekdaysSet.add(weekday);
  }

  const weekdays = Array.from(weekdaysSet);

  lesson.name = `${faker.word.adverb()} ${faker.word.adjective()} ${faker.word.noun()}`;
  // 04월 28일은 내 생일!
  lesson.type = lessonType[faker.number.int({ min: 4, max: 28 }) % 2];
  lesson.memo = faker.lorem.lines({ min: 5, max: 10 });

  return lesson;
});
