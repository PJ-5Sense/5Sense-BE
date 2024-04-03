import { Test, TestingModule } from '@nestjs/testing';
import { SocialType } from 'src/auth/type/social.type';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { SocialService } from '../../social/social.service';
import { CreateSocial, CreateUser } from '../type/create-user.type';
import { UserEntity } from '../entity/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let socialService: SocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: { create: jest.fn(), findOneById: jest.fn() } },
        { provide: SocialService, useValue: { create: jest.fn(), findOneByUser: jest.fn() } },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    socialService = module.get<SocialService>(SocialService);
  });

  const createUserDto: CreateUser = {
    name: 'TEST_NAME',
    profile: 'TEST_PROFILE',
    email: 'TEST_EMAIL',
    phone: '01012345678',
  };
  const createSocialDto: CreateSocial = {
    socialId: 'socialId-ABC',
    socialType: SocialType.Kakao,
    socialAccessToken: 'accessToken',
    socialRefreshToken: 'refreshToken',
  };

  const createdUser: UserEntity = {
    ...createUserDto,
    id: 1,
    createdDate: new Date(),
    deletedDate: new Date(),
    centers: [],
    socials: [],
    auth: [],
  };

  describe('createUser Unit Test - 유저 생성하기', () => {
    it('유저 정보 성공 시 유저 정보를 리턴', async () => {
      jest.spyOn(userRepository, 'create').mockResolvedValueOnce(createdUser);
      const result = await userService.createUser(createUserDto, createSocialDto);

      expect(result).toEqual(createdUser);

      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(socialService.create).toHaveBeenCalledWith(createSocialDto, createdUser);
    });
  });

  describe('findUserBySocialId Unit Test - 소셜아이디로 유저 정보 가져오기', () => {
    it('일치하는 소셜 정보가 존재하는 경우, 유저 정보를 리턴', async () => {
      jest.spyOn(socialService, 'findOneByUser').mockResolvedValue(createdUser);
      const result = await userService.findUserBySocialId('socialId-ABC', SocialType.Kakao);
      expect(result).toEqual(createdUser);
    });
    it('일치하는 소셜아이디가 없을 경우 null을 리턴', async () => {
      jest.spyOn(socialService, 'findOneByUser').mockResolvedValue(null);

      const result = await userService.findUserBySocialId('socialId-ABC', SocialType.Kakao);
      expect(result).toBeNull();
    });
  });

  describe('findUserBySocialId Unit Test - 소셜아이디로 유저 정보 가져오기', () => {
    it('일치하는 유저 아이디의 정보가 존재하는 경우, 유저 정보를 리턴', async () => {
      jest.spyOn(userRepository, 'findOneById').mockResolvedValue(createdUser);
      const result = await userService.findOneById(createdUser.id);
      expect(result).toEqual(createdUser);
    });

    it('일치하는 유저아이디의 정보가 존재하지 않을 경우 null을 리턴', async () => {
      const nonExistentUserId = 99999;

      jest.spyOn(userRepository, 'findOneById').mockResolvedValue(null);

      const result = await userService.findOneById(nonExistentUserId);
      expect(result).toBeNull();
    });
  });
});
