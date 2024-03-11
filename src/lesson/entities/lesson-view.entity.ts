import { ViewColumn, ViewEntity } from 'typeorm';

// 카테고리로 필터로 찾으면, 카테고리 pk아이디로 IN으로 검색

@ViewEntity({
  name: 'lesson_view',
  expression: `SELECT
  'duration' AS lesson_type,
  DL.id,
  DL.name,
  DL.lesson_time,
  DL.created_date,
  DL.center_id,
  T.id AS teacher_id,
  T.name AS teacher_name,
  C.id AS category_id,
  C.name AS category_name,
  C.parentId AS category_parentId,
  (SELECT COUNT(*) FROM duration_lesson_registration DR WHERE DR.lesson_id = DL.id) AS registration_count
  DS.start_date,
  DS.endDate,
  DS.repeatDate,
  LR.id AS room_id,
  LR.name AS room_name
FROM 
  duration_lesson DL
INNER JOIN 
  teacher T ON DL.teacher_id = T.id
INNER JOIN 
  category C ON DL.category_id = C.id
INNER JOIN
  duration_lesson_schedule DS ON DS.lessonId = DL.id
INNER JOIN
  lesson_room LR ON LR.id = DS.room_id
UNION ALL
SELECT 
  SL.id AS lesson_id,
  SL.name AS lesson_name,
  SL.lesson_time,
  SL.created_date,
  SL.center_id,
  T.id AS teacher_id,
  T.name AS teacher_name,
  C.id AS category_id,
  C.name AS category_name,
  C.parentId AS category_parentId,
  (SELECT COUNT(*) FROM session_lesson_registration SLR WHERE SLR.lesson_id = SL.id) ASregistration_count,
  SLS.SessionDate,
  SLS.startTime,
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
  @ViewColumn({ name: 'lesson_type' })
  lessonType: string;
}
