import { Injectable } from '@nestjs/common';
import { LessonRegistrationRepository } from './session-registration.repository';

@Injectable()
export class LessonRegistrationService {
  constructor(private readonly lessonRegistrationRepository: LessonRegistrationRepository) {}
}
