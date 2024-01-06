import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceImpl } from './user.service';
import { USER_DAO } from './dao/user.dao.interface';
import { CreateUser } from './types/create-user.type';
import { UserEntity } from './entities/user.entity';
import { CenterEntity } from 'src/center/entities/center.entity';
import { IUserService, USER_SERVICE } from './user.service.interface';

const mockDao = {
  create: jest.fn(),
  findOneUserCenterByUserId: jest.fn(),
};

describe('UserService', () => {
  let userService: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: USER_SERVICE, useClass: UserServiceImpl },
        {
          provide: USER_DAO,
          useValue: mockDao,
        },
      ],
    }).compile();

    userService = module.get<IUserService>(USER_SERVICE);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Create User - create()', () => {
    it('should create a new user', async () => {
      const createUser: CreateUser = {
        name: '테스트',
        profile: '테스트 프로필',
        email: 'test@gmail.com',
        phone: '01000001111',
      };

      const user = mockDao.create.mockReturnValue(createUser);

      expect(await userService.create(createUser)).toEqual(user());
    });
  });

  describe('Find User Center ID - findOneUserCenterByUserId()', () => {
    it('if User Have Center, get it', async () => {
      const mockUserId = 1;
      const mockCenterId = 10;
      const mockUser: UserEntity = {
        id: mockUserId,
        name: '테스트',
        profile: '테스트 프로필',
        email: 'test@gmail.com',
        phone: '01000001111',
        createdDate: new Date(),
        deletedDate: null,
        center: [],
        social: [],
      };
      const mockCenter: CenterEntity = {
        id: mockCenterId,
        name: '센터 테스트 이름',
        address: '센터 주소',
        mainPhone: '센터 연락처',
        profile: '센터프로필',
        userId: mockUserId,
        user: mockUser,
        students: [],
        teachers: [],
        lessons: [],
        createdDate: new Date(),
        deletedDate: null,
      };

      mockUser.center.push(mockCenter);

      mockDao.findOneUserCenterByUserId.mockReturnValue(mockUser);

      expect(await userService.findOneUserCenterByUserId(mockUserId)).toEqual(mockCenterId);
    });
  });
});
