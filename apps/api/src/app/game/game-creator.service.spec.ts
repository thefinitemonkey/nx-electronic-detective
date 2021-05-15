import { Test, TestingModule } from '@nestjs/testing';
import { GameCreatorService } from './game-creator.service';

describe('GameCreatorService', () => {
  let service: GameCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCreatorService],
    }).compile();

    service = module.get<GameCreatorService>(GameCreatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
