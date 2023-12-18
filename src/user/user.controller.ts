import { Controller, Inject } from '@nestjs/common';
import { IUserService, USER_SERVICE } from './user.service.interface';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}
}
