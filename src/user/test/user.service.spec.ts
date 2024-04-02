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
        { provide: UserRepository, useValue: { create: jest.fn(), findOne: jest.fn() } },
        { provide: SocialService, useValue: { create: jest.fn(), findOneByUser: jest.fn() } },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    socialService = module.get<SocialService>(SocialService);
  });

  it('should create a user and social link', async () => {
    const createUserDto: any = {};
    const createSocialDto: any = {};
    const expectedUser: any = {};

    jest.spyOn(userRepository, 'create').mockResolvedValueOnce(expectedUser);
    jest.spyOn(socialService, 'create').mockResolvedValueOnce(undefined);
    const result = await userService.createUser(createUserDto, createSocialDto);
    expect(result).toEqual(expectedUser);
    expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(socialService.create).toHaveBeenCalledWith(createSocialDto, expectedUser);
  });
});
