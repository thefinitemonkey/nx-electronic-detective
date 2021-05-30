
import { Helpers } from '@electronic-detective/utilities';
import {
  Address,
  Character,
  Location,
  Weapon,
  GameSetup
} from '@electronic-detective/interfaces';
import * as addresses from '../assets/addresses.json';
import * as characters from '../assets/characters.json';
import * as locations from '../assets/locations.json';
import * as weapons from '../assets/weapons.json';


export class GameFunctions {
  public static buildGame(): GameSetup {
    const charactersArr: Character[] = characters;
    // Pick a victim from the cast of characters, then remove them
    // from the list of characters
    const victimIndex: number = Helpers.getRandomInt(charactersArr.length);
    const victim: string = charactersArr[victimIndex].id;
    charactersArr.splice(victimIndex, 1);
    // Pick a murderer, but leave them in the cast
    const murdererIndex = Helpers.getRandomInt(charactersArr.length);
    const murderer: string = charactersArr[murdererIndex].id;

    // Define the address of each location and put an empty weapon
    // object at each
    const locationsArr: Location[] = locations;

    const addressesArr: Address[] = addresses;
    locationsArr.forEach((location) => {
      const address = Helpers.getRandomInt(addressesArr.length);
      location.address = addressesArr[address];
      addressesArr.splice(address, 1);
      location.weapon = {'id':'', 'type': '', 'fingerprint':''} as Weapon;
    });

    // One of the locations is the scene of the crime, so remove it from play
    const sceneIndex: number = Helpers.getRandomInt(locationsArr.length);
    const sceneObj: Location = locationsArr[sceneIndex];
    const sceneId: string = sceneObj.id;
    locationsArr.splice(sceneIndex, 1);

    // Pick the weapon used to commit the crime
    const weaponsArr: Weapon[] = weapons;
    const weapon: string =
      weaponsArr[Helpers.getRandomInt(weaponsArr.length)].id;

    // Everywhere that isn't the scene of the crime has one odd-numbered male,
    // one odd-numbered femaile, one even-numbered male, and one even-numbered
    // female with the exception of the dead person, so there will be an
    // empty seat at one of the locations
    const evenMenArr: Character[] = [];
    const oddMenArr: Character[] = [];
    const evenWomenArr: Character[] = [];
    const oddWomenArr: Character[] = [];
    charactersArr.forEach((character) => {
      if (character.gender == 'M') {
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
    const randLocationsArr: Location[] = [];
    const numLocs = locationsArr.length;
    for (let i = 0; i < numLocs; i++) {
      const index = Helpers.getRandomInt(locationsArr.length);
      // Have to replicate the location so we don't mutate the source data
      randLocationsArr.push({ ...locationsArr[index] });
      locationsArr.splice(index, 1);
    }
    // Each location gets occupied with the characters
    let murdererLoc: string;
    randLocationsArr.forEach((location) => {
      const occupants: Array<string> = [];
      sortChars.forEach((sortArr) => {
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
    const randWeaponLocs: Location[] = randLocationsArr
      .slice(0)
      .filter((randWeaponLoc) => randWeaponLoc.id !== murdererLoc);

    const murdererOdd = characters.find(character => character.id == murderer).odd;
    weaponsArr.forEach((tossWeapon) => {
      // For the murder weapon, prints have to match murderer, otherwise
      // the prints should be the opposite (even / odd)
      const newWeapon: Weapon = {...tossWeapon};
      if (newWeapon.id === weapon) {
        newWeapon.fingerprint = murdererOdd ? 'odd' : 'even';
      } else {
        newWeapon.fingerprint = murdererOdd ? 'even' : 'odd';
      }
      const randIndex = Helpers.getRandomInt(randWeaponLocs.length);
      randWeaponLocs[randIndex].weapon = newWeapon;
      randWeaponLocs.splice(randIndex, 1);
    });
    // Put the scene of the crime back into the list of locations
    randLocationsArr.push(sceneObj);

    const finalData = {
      locations: randLocationsArr,
      scene: sceneId,
      victim,
      murderer,
      weapon,
    };
    console.log('Created game: ', finalData);

    return finalData;
  }
}
