import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateSocial, CreateUser } from './type/create-user.type';
import { UserEntity } from './entity/user.entity';
import { SocialService } from '../social/social.service';
import { SocialType } from 'src/auth/type/social.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly socialService: SocialService) {}

  /**
   * 유저 정보(소셜 정보 포함) 저장
   * (UserEntity를 Controller의 Response로 사용하지 않도록 주의 및 확인 필요)
   *
   * @param user
   * @returns UserEntity
   */
  async createUser(user: CreateUser, social: CreateSocial): Promise<UserEntity> {
    const savedUser = await this.userRepository.create(user);

    await this.socialService.create(social, savedUser);
    return savedUser;
  }

  async findUserBySocialId(socialId: string, socialType: SocialType): Promise<UserEntity | null> {
    const user = await this.socialService.findOneByUser(socialId, socialType);

    if (user) {
      return await this.userRepository.findOne(user.id);
    }

    return null;
  }

  async findOne(userId: number) {
    return await this.userRepository.findOne(userId);
  }
}
