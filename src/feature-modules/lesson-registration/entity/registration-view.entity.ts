import { ViewColumn, ViewEntity } from 'typeorm';
import { PaymentStatus } from '../../lesson/type/lesson-payment-status.type';
import { LessonType } from '../../lesson/type/lesson.type';

@ViewEntity({
  name: 'registration_view',
  expression: `SELECT
    'duration' AS type,
    DL.name,
    DL.center_id,
    DL.tuition_fee,
    DLR.id,
    DLR.payment_status AS payment_status,
    DLR.created_date,
    S.name AS student_name,
    S.phone AS student_phone
  FROM 
    duration_lesson DL
  INNER JOIN 
    duration_lesson_registration DLR ON DL.id = DLR.lesson_id
  LEFT JOIN 
    student S ON DLR.student_id = S.id
  UNION ALL
  SELECT 
    'session' AS type,
    SL.name,
    SL.center_id,
    SL.tuition_fee,
    SLR.id,
    SLR.payment_status AS payment_status,
    SLR.created_date,
    S.name AS student_name,
    S.phone AS student_phone
  FROM 
    session_lesson SL
  INNER JOIN 
    session_lesson_registration SLR ON SL.id = SLR.lesson_id
  LEFT JOIN 
    student S ON SLR.student_id = S.id`,
})
export class RegistrationViewEntity {
  @ViewColumn({ name: 'id' })
  id: number;

  @ViewColumn({ name: 'type' })
  type: LessonType;

  @ViewColumn({ name: 'payment_status' })
  paymentStatus: PaymentStatus;

  @ViewColumn({ name: 'name' })
  name: string;

  @ViewColumn({ name: 'tuition_fee' })
  tuitionFee: number;

  @ViewColumn({ name: 'student_phone' })
  studentPhone: string;

  @ViewColumn({ name: 'student_name' })
  studentName: string;

  @ViewColumn({ name: 'center_id' })
  centerId: number;

  @ViewColumn({ name: 'created_date' })
  createdDate: Date;
}
