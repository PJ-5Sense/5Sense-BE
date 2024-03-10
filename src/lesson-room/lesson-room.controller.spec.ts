import { Test, TestingModule } from '@nestjs/testing';
import { CenterRoomController } from './lesson-room.controller';
import { CenterRoomService } from './lesson-room.service';

describe('CenterRoomController', () => {
  let controller: CenterRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CenterRoomController],
      providers: [CenterRoomService],
    }).compile();

    controller = module.get<CenterRoomController>(CenterRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
