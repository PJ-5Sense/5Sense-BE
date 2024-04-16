import { Injectable } from '@nestjs/common';
import { DurationLessonRegistrationRepository } from './duration-registration.repository';

@Injectable()
export class DurationLessonRegistrationService {
  constructor(private readonly lessonRegistrationRepository: DurationLessonRegistrationRepository) {}
}
