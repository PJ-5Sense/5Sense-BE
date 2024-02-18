import { Test, TestingModule } from '@nestjs/testing';
import { CenterRoomService } from './room.service';

describe('CenterRoomService', () => {
  let service: CenterRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CenterRoomService],
    }).compile();

    service = module.get<CenterRoomService>(CenterRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
