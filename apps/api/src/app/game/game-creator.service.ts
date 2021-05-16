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
    const sceneId: string = sceneObj.id;
    locationsArr.splice(sceneIndex, 1);

    // Pick the weapon used to commit the crime
    const weaponsArr = Helpers.objKeysToArray(weapons);
    const weapon: string = weaponsArr[Helpers.getRandomInt(weaponsArr.length)].id;

    // Everywhere that isn't the scene of the crime has one odd-numbered male,
    // one odd-numbered femaile, one even-numbered male, and one even-numbered
    // female with the exception of the dead person, so there will be an
    // empty seat at one of the locations
    const evenMenArr: Array<Character> = [];
    const oddMenArr: Array<Character> = [];
    const evenWomenArr: Array<Character> = [];
    const oddWomenArr: Array<Character> = [];
    charactersArr.forEach(character => {
      if (character.gender == "M") {
        if (character.odd == true) {
          oddMenArr.push(character);
        } else {
          evenMenArr.push(character);
        }
      } else {
        if (character.odd == true) {
          oddWomenArr.push(character);
        } else {
          evenWomenArr.push(character);
        }
      }
    });
    const sortChars = [evenMenArr, oddMenArr, evenWomenArr, oddWomenArr];

    // Randomize the locations order before putting people in each of them
    // so as to not always have the empty spot at the last location
    const randLocationsArr: Array<Location> = [];
    const numLocs = locationsArr.length;
    for (let i = 0; i < numLocs; i++) {
      const index = Helpers.getRandomInt(locationsArr.length);
      // Have to replicate the location so we don't mutate the source data
      randLocationsArr.push({...locationsArr[index]});
      locationsArr.splice(index, 1);
    }
    // Each location gets occupied with the characters
    let murdererLoc: string;
    randLocationsArr.forEach(location => {
      const occupants: Array<string> = [];
      sortChars.forEach(sortArr => {
        if (sortArr.length) {
          const index = Helpers.getRandomInt(sortArr.length);
          occupants.push(sortArr[index].id);
          if (sortArr[index].id === murderer) murdererLoc = location.id;
          sortArr.splice(index, 1);
        }
      });
      location.occupants = occupants;
    });

    // Pick the locations to stash the weapons. These cannot be the same
    // as the scene of the crime or where the murderer is hiding.
    const randWeaponLocs: Array<Location> = randLocationsArr.slice(0).filter(randWeaponLoc => randWeaponLoc.id !== murdererLoc);

    const murdererOdd = characters[murderer].odd;
    weaponsArr.forEach(tossWeapon => {
      // For the murder weapon, prints have to match murderer, otherwise
      // the prints should be the opposite (even / odd)
      const newWeapon: Weapon = Helpers.deepCopy(tossWeapon) as Weapon;
      if (newWeapon.id === weapon) {
        newWeapon.fingerprint = murdererOdd ? "odd" : "even";
      } else {
        newWeapon.fingerprint = murdererOdd ? "even" : "odd";
      }
      const randIndex = Helpers.getRandomInt(randWeaponLocs.length);
      randWeaponLocs[randIndex].weapon = newWeapon;
      randWeaponLocs.splice(randIndex, 1);
    });
    // Put the scene of the crime back into the list of locations
    randLocationsArr.push(sceneObj);

    return {name: name, id: ""};
  }
}
