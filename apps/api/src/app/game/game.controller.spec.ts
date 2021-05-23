import { Test, TestingModule } from '@nestjs/testing';
import { GameCreatorService } from './game-creator.service';
import { GameController } from './game.controller';
import { GameAction } from '@electronic-detective/api-interfaces';

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

  new Promise(() => {
    const instance = new GameController(new GameCreatorService());
    instance.getData('test');
  }).then((response) => {
    const result: GameAction = response as GameAction;

    it('should should generate a properly formatted response', () => {
      const expected = expect.stringMatching(/^([a-zA-Z0-9]){32,32}$/);
      expect(result.id).toEqual(expected);
      expect(result.name).toBe('test');
      expect(result.code).toBe('200');
      console.log('Complete GameController check of return');
    });
  });
});
