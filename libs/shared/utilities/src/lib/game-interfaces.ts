export interface Address {
  "side": string;
  "town": string;
}

export interface Weapon {
  "id": string;
  "type": string;
  "fingerprint": string;
}

export interface Location {
  "id": string;
  "name": string;
  "address": Address;
  "occupants": Array<Character>;
  "weapon": Weapon;
}

export interface CharacterImages {
  "portrait": string;
  "profile": string;
}

export interface Character {
  "id": string;
  "odd": boolean;
  "name": string;
  "gender": string;
  "occupation": string;
  "relationshipID": BigInteger;
  "relationshipStatus": string;
  "images": CharacterImages;
  "availableQuestions": Array<BigInteger>;
}
