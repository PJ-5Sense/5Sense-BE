import { ViewColumn, ViewEntity } from 'typeorm';

// 카테고리로 필터로 찾으면, 카테고리 pk아이디로 IN으로 검색

@ViewEntity({
  name: 'lesson_view',
  expression: `SELECT
  'duration' AS type,
  DL.id,
  DL.name,
  DL.created_date,
  DL.center_id,
  T.id AS teacher_id,
  T.name AS teacher,
  C.id AS category_id,
  C.name AS category,
  C.parent_id AS category_parent_id,
  (SELECT COUNT(*) FROM duration_lesson_registration DR WHERE DR.lesson_id = DL.id) AS number_of_students
FROM 
  duration_lesson DL
INNER JOIN 
  teacher T ON DL.teacher_id = T.id
INNER JOIN 
  category C ON DL.category_id = C.id
UNION ALL
SELECT 
  'session' AS type,
  SL.id,
  SL.name,
  SL.created_date,
  SL.center_id,
  T.id AS teacher_id,
  T.name AS teacher,
  C.id AS category_id,
  C.name AS category,
  C.parent_id AS category_parent_id,
  (SELECT COUNT(*) FROM session_lesson_registration SLR WHERE SLR.lesson_id = SL.id) AS number_of_students
FROM 
  session_lesson SL
LEFT JOIN 
  teacher T ON SL.teacher_id = T.id
LEFT JOIN 
  category C ON SL.category_id = C.id`,
})
export class LessonViewEntity {
  @ViewColumn({ name: 'id' })
  id: number;

  @ViewColumn({ name: 'type' })
  type: string;

  @ViewColumn({ name: 'name' })
  name: string;

  @ViewColumn({ name: 'center_id' })
  centerId: number;

  @ViewColumn({ name: 'teacher_id' })
  teacherId: number;

  @ViewColumn({ name: 'teacher' })
  teacher: string;

  @ViewColumn({ name: 'category_id' })
  categoryId: number;

  @ViewColumn({ name: 'category' })
  category: string;

  @ViewColumn({ name: 'category_parent_id' })
  categoryParentId: number;

  @ViewColumn({ name: 'number_of_students' })
  numberOfStudents: number;

  @ViewColumn({ name: 'created_date' })
  createdDate: Date;
}
