import { Injectable } from '@nestjs/common';
import { Game } from '@electronic-detective/api-interfaces';
import { Helpers } from '@electronic-detective/utilities';
import { Address, Character, Location, Weapon } from '@electronic-detective/utilities';
import * as addresses from '../../assets/addresses.json';
import * as characters from '../../assets/characters.json';
import * as locations from '../../assets/locations.json';
import * as weapons from '../../assets/weapons.json';

@Injectable()
export class GameCreatorService {
  createGame(name: string): Game {
    const charactersArr: Array<Character> = Helpers.objKeysToArray(characters);
    // Pick a victim from the cast of characters, then remove them
    // from the list of characters
    const victimIndex: number = Helpers.getRandomInt(charactersArr.length);
    const victim: Character = charactersArr[victimIndex].id;
    charactersArr.splice(victimIndex, 1);
    // Pick a murderer, but leave them in the cast
    const murdererIndex = Helpers.getRandomInt(charactersArr.length);
    const murderer: string = charactersArr[murdererIndex].id;

    // Define the address of each location
    const locationsArr: Array<Location> = Helpers.objKeysToArray(Helpers.deepCopy(locations));
    const addressesArr: Array<Address> = Helpers.objKeysToArray(addresses);
    locationsArr.forEach(location => {
      const address = Helpers.getRandomInt(addressesArr.length);
      location.address = addressesArr[address];
      addressesArr.splice(address, 1);
    })

    // One of the locations is the scene of the crime, so remove it from play
    const sceneIndex: number = Helpers.getRandomInt(locationsArr.length);
    const sceneObj: Location = locationsArr[sceneIndex];
    const sceneId = sceneObj.id;
    locationsArr.splice(sceneIndex, 1);

    // Pick the weapon used to commit the crime
    const weaponsArr = Helpers.objKeysToArray(weapons);
    const weapon: Weapon = weaponsArr[Helpers.getRandomInt(weaponsArr.length)].id;

    return {name: name, id: ""};
  }
}
