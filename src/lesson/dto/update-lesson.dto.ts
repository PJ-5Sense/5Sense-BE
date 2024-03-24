import { IsInt, IsObject, ValidateIf, ValidateNested } from 'class-validator';
import { DurationLessonDTO, DurationScheduleDTO, SessionLessonDTO } from './create-lesson.dto';
import { Type } from 'class-transformer';
import { LessonType } from '../types/lesson.type';

export class UpdateDurationScheduleDTO extends DurationScheduleDTO {
  @IsInt()
  id: number;
}

export class UpdateDurationLessonDTO extends DurationLessonDTO {
  @IsInt()
  id: number;

  // Override
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateDurationScheduleDTO)
  schedules: UpdateDurationScheduleDTO[];
}

export class UpdateSessionLessonDTO extends SessionLessonDTO {
  @IsInt()
  id: number;
}

export class UpdateLessonDTO {
  type: LessonType;

  @ValidateIf((o: UpdateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => UpdateDurationLessonDTO)
  durationLesson: UpdateDurationLessonDTO;

  @ValidateIf((o: UpdateLessonDTO) => o.type === LessonType.DURATION)
  @ValidateNested()
  @Type(() => UpdateSessionLessonDTO)
  sessionLesson: UpdateSessionLessonDTO;
}
