import { Test, TestingModule } from '@nestjs/testing';
import { GameCreatorService } from './game-creator.service';
import { GameController } from './game.controller';

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameCreatorService],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should should generate a properly formatted response', () => {
    const expected = expect.stringMatching(/^([a-zA-Z0-9]){32,32}$/);
    expect(controller.getData('test').id).toEqual(expected);
    expect(controller.getData('test').name).toBe('test');
  })
});
