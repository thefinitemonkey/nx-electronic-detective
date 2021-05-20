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

  it('should have a 32 character id', () => {
    expect(service.createGame('test').id.length).toBe(32);
  });

  it('should return the name provided', () => {
    expect(service.createGame('test').name).toBe('test');
  });

  const instance = new GameCreatorService();
  instance.createGame('test');
  const game = instance.getGame();
  it('should generate a properly formatted game object', () => {
    expect(Object.keys(game.locations).length).toEqual(6);
    const expected = expect.stringMatching(/^([A-Z])$/);
    expect(game.scene).toEqual(expected);
    const victimNum = Number(game.victim);
    let inRange = victimNum > 0 && victimNum < 21;
    expect(inRange).toBeTruthy;
    const murdererNum = Number(game.murderer);
    inRange = murdererNum > 0 && murdererNum < 21;
    expect(inRange).toBeTruthy;
    const goodWeapon = game.weapon == '.45' || game.weapon == '.38';
    expect(goodWeapon).toBeTruthy;
    const locKeys = Object.keys(game.locations['A']);
    const goodKeys =
      locKeys.lastIndexOf('name') > -1 &&
      locKeys.lastIndexOf('address') > -1 &&
      locKeys.lastIndexOf('occupants') > -1 &&
      locKeys.lastIndexOf('weapon') > -1;
    expect(goodKeys).toBeTruthy;
  });

  it('should have one empty location', () => {
    const keys = Object.keys(game.locations);
    let numEmpty = 0;
    keys.forEach((key) => {
      if (game.locations[key]['occupants'].length == 0) numEmpty++;
    });
    expect(numEmpty).toBe(1);
  });

  it('should have four locations with 4 occupants', () => {
    const keys = Object.keys(game.locations);
    let numFour = 0;
    keys.forEach((key) => {
      if (game.locations[key]['occupants'].length == 4) numFour++;
    });
    expect(numFour).toBe(4);
  });

  it('should have one location with 3 occupants', () => {
    const keys = Object.keys(game.locations);
    let numThree = 0;
    keys.forEach((key) => {
      if (game.locations[key]['occupants'].length == 3) numThree++;
    });
    expect(numThree).toBe(1);
  });

  // TO-DO: Only one location should have the .38, and it shouldn't be
  // the scene of the crime or where the murderer is

  // TO-DO: Only one location should have the .45, and it shouldn't be
  // the scene of the crime or where the murderer is

  /// TO-DO: The murder weapon should match the prints of the murderer
  // and the other weapon should not match the murderer
});
