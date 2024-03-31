import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from '../type/create-user.type';
import { UserEntity } from '../entity/user.entity';
import { CenterEntity } from 'src/center/entity/center.entity';

describe('UserService', () => {
  const mockDao = {
    create: jest.fn(),
    findOneUserCenterByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  it('should be defined', () => {
    // expect(userService).toBeDefined();
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
