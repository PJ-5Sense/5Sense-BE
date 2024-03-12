import { ViewColumn, ViewEntity } from 'typeorm';

// 카테고리로 필터로 찾으면, 카테고리 pk아이디로 IN으로 검색

@ViewEntity({
  name: 'lesson_view',
  expression: `SELECT
  'duration' AS lesson_type,
  DL.id AS lesson_id,
  DL.name AS lesson_name,
  DL.lesson_time AS lesson_time,
  DL.created_date AS created_date,
  DL.center_id AS center_id,
  T.id AS teacher_id,
  T.name AS teacher_name,
  C.id AS category_id,
  C.name AS category_name,
  C.parent_id AS category_parent_id,
  (SELECT COUNT(*) FROM duration_lesson_registration DR WHERE DR.lesson_id = DL.id) AS registration_count,
  DS.start_date AS start_date,
  DS.end_date AS end_date,
  DS.repeat_date AS repeat_date,
  DS.start_time AS start_time,
  LR.id AS room_id,
  LR.name AS room_name
FROM 
  duration_lesson DL
INNER JOIN 
  teacher T ON DL.teacher_id = T.id
INNER JOIN 
  category C ON DL.category_id = C.id
INNER JOIN
  duration_lesson_schedule DS ON DS.lesson_id = DL.id
INNER JOIN
  lesson_room LR ON LR.id = DS.room_id
UNION ALL
SELECT 
  'session' AS lesson_type,
  SL.id AS lesson_id,
  SL.name AS lesson_name,
  SL.lesson_time AS lesson_time,
  SL.created_date AS created_date,
  SL.center_id AS center_id,
  T.id AS teacher_id,
  T.name AS teacher_name,
  C.id AS category_id,
  C.name AS category_name,
  C.parent_id AS category_parent_id,
  (SELECT COUNT(*) FROM session_lesson_registration SLR WHERE SLR.lesson_id = SL.id) AS registration_count,
  SLS.session_date AS start_date,
  SLS.session_date AS end_date,
  Null AS repeatDate,
  SLS.start_time AS start_time,
  LR.id AS room_id,
  LR.name AS room_name
FROM 
    session_lesson SL
LEFT JOIN 
    teacher T ON SL.teacher_id = T.id
LEFT JOIN 
    category C ON SL.category_id = C.id
LEFT JOIN 
    session_lesson_registration SLR ON SL.id = SLR.lesson_id
LEFT JOIN 
    session_lesson_schedule SLS ON SLR.id = SLS.session_registration_id
LEFT JOIN 
    lesson_room LR ON SLS.room_id = LR.id;`,
})
export class LessonViewEntity {
  @ViewColumn({ name: 'lesson_id' })
  lessonId: number;

  @ViewColumn({ name: 'lesson_type' })
  lessonType: string;

  @ViewColumn({ name: 'lesson_name' })
  lessonName: string;

  @ViewColumn({ name: 'center_id' })
  centerId: number;

  @ViewColumn({ name: 'teacher_id' })
  teacherId: number;

  @ViewColumn({ name: 'teacher_name' })
  teacherName: string;

  @ViewColumn({ name: 'category_id' })
  categoryId: number;

  @ViewColumn({ name: 'category_name' })
  categoryName: string;

  @ViewColumn({ name: 'category_parent_id' })
  categoryParentId: number;

  @ViewColumn({ name: 'registration_count' })
  registrationCount: number;

  @ViewColumn({ name: 'room_id' })
  roomId: number;

  @ViewColumn({ name: 'room_name' })
  roomName: string;

  @ViewColumn({ name: 'start_date' })
  startDate: Date;

  @ViewColumn({ name: 'end_date' })
  endDate: Date;

  @ViewColumn({ name: 'repeat_date' })
  repeatDate: string;

  @ViewColumn({ name: 'lesson_time' })
  lessonTime: number;

  @ViewColumn({ name: 'start_time' })
  startTime: string;

  @ViewColumn({ name: 'created_date' })
  createdDate: Date;
}
