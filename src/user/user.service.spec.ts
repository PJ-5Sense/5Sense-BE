import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserDao, USER_DAO } from './dao/user.dao.interface';
import { CreateUser } from './types/create-user.type';
import { UserEntity } from './entities/user.entity';
import { SocialType } from 'src/auth/types/social.type';
import { AuthEntity } from 'src/auth/entities/auth.entity';

describe('UserService', () => {
  let userService: UserService;
  let userDaoMock: IUserDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_DAO,
          useValue: {
            create: jest.fn(),
            findOneBySocialId: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userDaoMock = module.get<IUserDao>(USER_DAO);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const socialEntity: AuthEntity = {
        socialId: '99999999',
        socialType: SocialType.Kakao,
        socialAccessToken: 'socialAccessToken',
        socialRefreshToken: 'socialRefreshToken',
        appRefreshToken: 'appRefreshToken',
        createdDate: new Date(),
        deletedDate: new Date(),
      };

      const userDto: CreateUser = {
        name: '윤태식',
        profile: 'profile_url',
        email: 'test@google.com',
        socialId: '99999999',
        phone: null,
        centerId: null,
      };

      const expectedResult: UserEntity = {
        ...userDto,
        id: 1,
        createdDate: new Date(),
        deletedDate: new Date(),
        center: null,
        social: socialEntity,
      };

      userDaoMock.create.mockResolvedValue(expectedResult);
      const result = await userService.create(userDto);

      expect(result).toEqual(expectedResult);
      expect(userDaoMock.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findOneBySocialId', () => {
    it('should return a user by social ID and type', async () => {
      const socialId = 'someSocialId';
      const socialType = SocialType.FACEBOOK;
      const expectedResult: UserEntity = {
        /* expected user entity */
      };

      userDaoMock.findOneBySocialId.mockResolvedValue(expectedResult);
      const result = await userService.findOneBySocialId(socialId, socialType);

      expect(result).toEqual(expectedResult);
      expect(userDaoMock.findOneBySocialId).toHaveBeenCalledWith(socialId, socialType);
    });
  });
});
