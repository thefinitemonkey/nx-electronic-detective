import { Test, TestingModule } from '@nestjs/testing';
import { GameFunctions } from './gameFunctions';
import * as characters from '../assets/characters.json';
import { Weapon, Character } from '@electronic-detective/interfaces';
import { GameAction } from '@electronic-detective/api-interfaces';

describe('GameFunctions', () => {
  let service: GameFunctions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameFunctions],
    }).compile();

    service = module.get<GameFunctions>(GameFunctions);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  new Promise(() => {
    const game = GameFunctions.buildGame();
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

    let weapon38: Weapon;
    let weapon45: Weapon;
    it('should have the .38 in a location away from the crime scene and murderer', () => {
      const keys = Object.keys(game.locations);
      let locCount = 0;
      let goodPlacement = true;
      keys.forEach((key) => {
        const weapon = game.locations[key]['weapon'];
        if (weapon['type'] == '.38') {
          locCount++;
          if (locCount > 1) goodPlacement = false;
          weapon38 = weapon;
          if (key == game.scene) goodPlacement = false;
          if (
            game.locations[key]['occupants'].filter(
              (occupant: Character) => occupant['id'] == game.murderer
            ).length > 0
          )
            goodPlacement = false;
        }
      });

      expect(goodPlacement).toBe(true);
    });

    it('should have the .45 in a location away from the crime scene and murderer', () => {
      const keys = Object.keys(game.locations);
      let locCount = 0;
      let goodPlacement = true;
      keys.forEach((key) => {
        const weapon = game.locations[key]['weapon'];
        if (weapon['type'] == '.45') {
          locCount++;
          if (locCount > 1) goodPlacement = false;
          weapon45 = weapon;
          if (key == game.scene) goodPlacement = false;
          if (
            game.locations[key]['occupants'].filter(
              (occupant: Character) => occupant['id'] == game.murderer
            ).length > 0
          )
            goodPlacement = false;
        }
      });

      expect(goodPlacement).toBe(true);
    });

    it('should have matching prints on the murder weapon and opposite on the other weapon', () => {
      const murdererPrints = characters[game.murderer as string]['odd']
        ? 'odd'
        : 'even';

      const otherPrints = characters[game.murderer as string]['odd']
        ? 'even'
        : 'odd';

      const expectedWeaponPrints =
        game.weapon == '.38'
          ? { '.38': murdererPrints, '.45': otherPrints }
          : { '.38': otherPrints, '.45': murdererPrints };

      const properPrints =
        weapon38.fingerprint == expectedWeaponPrints['.38'] &&
        weapon45.fingerprint == expectedWeaponPrints['.45']
          ? true
          : false;

      expect(properPrints).toBe(true);
    });
  }).then((response) => {
    const result: GameAction = response as GameAction;
    it('should have a 32 character id', () => {
      expect(result.id.length).toBe(32);
    });

    it('should return the name provided', () => {
      expect(result.name).toBe('test');
    });

    it('should have a response code of 200', () => {
      expect(result.code).toBe('200');
    });
  });
});
